import { FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredientials, logOut } from "./features/userSlice";
import { AuthService } from "./authServices";
import { RooState } from "./store";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";


const authService = new AuthService()
interface Enviroment {
    android: string | undefined;
    web: string | undefined;
}

const enviroment: Enviroment = {
    android: 'http://192.168.128.251:5000',
    web: 'http://localhost:5000',
}


const baseQuery = fetchBaseQuery({
    baseUrl: enviroment.android,
    credentials: "include",
    mode: "cors",

    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RooState
        if (state.auth.token) {
            headers.set("authorization", `Bearer ${state.auth.token}`)
        }
     
        return headers
    }
})

const baseQueryReAuth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions)
    // console.log("base query ", result)
    if (result?.error?.status === 401 && result?.error?.data === "invalid or expired token" ) {
        console.log("sending refresh token....")
        const refreshResult:any = await baseQuery("/api/auth/refresh-token", api, extraOptions)
        console.log("refresh result", refreshResult?.data[0])
        if (refreshResult?.data[0]) {
            const refreshData ={
                _id:refreshResult?.data[0].userId,
                token:refreshResult?.data[0].token,
                user:refreshResult?.data[0].user
            }
            const user = api.getState().auth.user
            // store the new token
            // api.dispatch(setCredientials({ ...refreshResult.data, user }))
            api.dispatch(setCredientials({ ...refreshData, user }))

            //retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
            // window.location.href="/login"
        }

    }
    return result
}


// create our api
export const apiSlice = createApi({
    baseQuery: baseQueryReAuth,
    endpoints: () => ({})
})
