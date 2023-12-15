import { AuthResponse, User } from '../../../model';
import { AuthService } from "../authServices";
import { apiSlice } from "../baseApi";
const authService = new AuthService()

// const _id = await authService.getUserId() 



export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getMe:builder.query<User,  void>({
            query: ()=>`api/user/profile/${authService.getUserId()}`
        }),

        get_profile:builder.query<User,  void>({
            query: ()=>`api/user/profile/${authService.getUserId()}`
        }),

        getAllUsers:builder.query<AuthResponse[],  void>({
            query: (userId)=>`api/user/all`
        }),

        update:builder.mutation({
            query: (body) =>({
                url:`api/user/update/657c41d8575a2dd78b115240`,
                method:"PUT",
                body,
                     
             })
        }),

      
    })
}) 


export const {useGetMeQuery, useUpdateMutation, useGetAllUsersQuery} = userApiSlice