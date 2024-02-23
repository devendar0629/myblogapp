import { createSlice } from '@reduxjs/toolkit'

//Implement a last login system that enables users stay logged in for a couple of days without logging in everytime
const authSlice = createSlice({
    name:'redux-name-authslice',
    initialState:{
        loginStatus: false,
        userData:null
    },
    reducers:{
        login:(state,action) => {
            state.loginStatus = true;
            state.userData = action.payload
        },
        logout:(state,action) => {
            state.loginStatus = false;
            state.userData = null
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer