import { createSlice, } from "@reduxjs/toolkit";

// initial state

const initialAuth = {
    status: false,
    userData: null,
}

const authSlice = createSlice({
    // name for debug
    name: "redux_auth",
    initialState: initialAuth,
    reducers:{

        // functions will be written here 
        login:(state, action)=>{
            state.status = true; 
            // accepts direct object or nested object
            state.userData = action.payload.userData || action.payload;
        },
        logout:(state, )=>{
            state.status = false;
            state.userData = null
        }

    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer