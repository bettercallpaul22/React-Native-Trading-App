import { Product, SingleProductType, User, UserProducts } from "../../../model";
import { AuthService } from "../authServices";
import { apiSlice } from "../baseApi";
const authService = new AuthService()

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        get_all_products: builder.query<Product[], void>({
            query: () => `api/product/all`
        }),

        get_product: builder.query<SingleProductType, { product_id: string; owner_id: string }>({
            query: ({ product_id, owner_id }) => ({
                url: `api/product/${product_id}/${owner_id}`,
            })
        }),

        get_user_products: builder.query<Product[], { owner_id: string }>({
            query: ({ owner_id }) => ({
                url: `api/product/${owner_id}`,
            })
        }),

        create_product: builder.mutation({
            query: (body) => ({
                url: `api/product/new`,
                method: "POST",
                body,

            })
        }),


    })
})


export const {
    useGet_all_productsQuery,
    useCreate_productMutation,
    useLazyGet_all_productsQuery,
    useGet_productQuery,
    useGet_user_productsQuery
} = userApiSlice