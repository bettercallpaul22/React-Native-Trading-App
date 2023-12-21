import { Offer, Product, SingleProductType, User, UserProducts } from "../../../model";
import { AuthService } from "../authServices";
import { apiSlice } from "../baseApi";
import { store } from "../store";
const authService = new AuthService()

interface OfferType {
    product_name: string;
    product_value: number;
    product_category: string;
    product_condition: string;
    product_desc: string;
    images: {_id:number; image:string}[];
}


export const offerSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        get_all_offers: builder.query<Offer[], void>({
            query: () => `api/offer/all`
        }),

        send_cash_offer: builder.mutation<any, { price_offered: number; product_id: string; }>({
            query: (body) => ({
                url: `api/offer/cash-offer/${store.getState().auth._id}`,
                method:'POST',
                body
            })
        }),

        send_trade_offer: builder.mutation<any, any>({
            query: (body) => ({
                url: `api/offer/trade-offer/${store.getState().auth._id}`,
                method: "POST",
                body,

            })
        }),


        // get_user_products: builder.query<Product[], { owner_id: string }>({
        //     query: ({ owner_id }) => ({
        //         url: `api/product/${owner_id}`,
        //     })
        // }),

        // create_product: builder.mutation({
        //     query: (body) => ({
        //         url: `api/product/new`,
        //         method: "POST",
        //         body,

        //     })
        // }),


    })
})


export const {
    useGet_all_offersQuery,
    useLazyGet_all_offersQuery,
    useSend_cash_offerMutation,
    useSend_trade_offerMutation,
} = offerSlice