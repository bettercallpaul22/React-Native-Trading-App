import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./baseApi";
import authReducer from "./features/userSlice"
// import storage from 'reduxjs-toolkit-persist/lib/storage'
// import { persistReducer, persistStore } from "reduxjs-toolkit-persist";

// const persist_config ={
//     key:'root',
//     storage,
//     whitelist:['auth']
// }

// const persist_reducer = persistReducer (persist_config, authReducer)



export const store = configureStore({
    // reducer:persist_reducer,
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

// export const persistor = persistStore(store)
export type Appdispatch = typeof store.dispatch;
export type RooState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)