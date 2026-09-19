import {configureStore} from '@reduxjs/toolkit'
// import MyauthSlice from "..store/authSlice"

import authReducer from "./authSlice"; 

// when export default , you choose whatever name you want too, but import location must be correct, so authSlice === authReducer

const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})

export default store