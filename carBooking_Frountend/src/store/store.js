import {configureStore} from "@reduxjs/toolkit"
import carReducer from "../slices/carSlice"
import userSlice from "../slices/userSlice"

export const store = configureStore({
    reducer:{
        cars:carReducer,
        user:userSlice
    }
})