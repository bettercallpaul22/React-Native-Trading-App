import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./baseApi";
import authReducer from "./features/userSlice"
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from 'redux-persist'


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  }
  const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: persistedReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck:false}).concat(apiSlice.middleware),
    devTools: true,
    
})

export const persistor = persistStore(store)
// export const store = configureStore({
//     reducer: {
//         [apiSlice.reducerPath]: apiSlice.reducer,
//         auth: authReducer
//     },
//     middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
//     devTools: true,
// })

// export const persistor = persistStore(store)
export type Appdispatch = typeof store.dispatch;
export type RooState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)
export const customDispatch = () => useDispatch<Appdispatch>();