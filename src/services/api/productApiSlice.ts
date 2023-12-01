import { Product } from "../../../model";
import { AuthService } from "../authServices";
import { apiSlice } from "../baseApi";
const authService = new AuthService()

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        get_all_products:builder.query<Product [],  void>({
            query: (userId)=>`api/product/all`
        }),

        create_product:builder.mutation({
            query: (body) =>({
                url:`api/product/new`,
                method:"POST",
                body,
                     
             })
        }),

      
    })
}) 


export const {useGet_all_productsQuery, useCreate_productMutation, useLazyGet_all_productsQuery} = userApiSlice