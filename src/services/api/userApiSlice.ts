import { AuthResponse, User } from '../../../model';
import { AuthService } from "../authServices";
import { apiSlice } from "../baseApi";
const authService = new AuthService()

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
                url:`api/user/update/${authService.getUserId()}`,
                method:"PUT",
                body,
                     
             })
        }),

      
    })
}) 


export const {useGetMeQuery, useUpdateMutation, useGetAllUsersQuery} = userApiSlice