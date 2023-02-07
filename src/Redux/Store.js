
import { configureStore } from "@reduxjs/toolkit"
import RoleReducer from "./Slices/RoleSlice"
import UserReducer from "./Slices/UserSlice"

export const store = configureStore({
    reducer : {
         RoleReducer,
         UserReducer
    },
    middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck:false
    })
})