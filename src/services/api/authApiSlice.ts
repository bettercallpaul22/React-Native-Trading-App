import { AuthService } from "../authServices";
import { apiSlice } from "../baseApi";
const authService = new AuthService()

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        login:builder.mutation({
            query: (body) =>({
                url:"api/auth/login",
                method:"POST",
                body           
             })
        }),

        chechExistingUser:builder.mutation({
            query:(body)=>({
                url:"api/auth/exist",
                method:"POST",
                body    
            })
        }),

        register:builder.mutation({
            query:(body)=>({
                url:"api/auth/register",
                method:"POST",
                body    
            })
        }),

        updateSkill:builder.mutation({
            query: (body) =>({
                url:`api/user/update-skill/${authService.getUserId()}`,
                method:"PUT",
                body,
                 
             })
        }),
    })
}) 


export const {useLoginMutation, useChechExistingUserMutation,useUpdateSkillMutation, useRegisterMutation} = authApiSlice