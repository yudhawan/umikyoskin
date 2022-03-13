import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { host } from "../host";
import axios from "axios";

export const authServices = createAsyncThunk("users/getUsers", async () => {
    const currentToken = localStorage.getItem('__umk_of_tkn')
    if (currentToken) {
        let token = await axios({
            method: 'GET',
            url:host+'/users/authservices',
            headers:{
                'authorization': `Bearer ${currentToken}`
            }
        }) 
        if(currentToken!=token.data.token){
            localStorage.removeItem('__umk_of_tkn')
            localStorage.removeItem('__umk_of_l')
            return {token:null, user:[]}
        }
        localStorage.setItem('__umk_of_l', token.data?.user?.email)
        return {token:token.data?.token, user:token.data?.user}
    }
})
export const userLogin = createAsyncThunk("users/login", async (data) => {
    const result = await axios.post(host+'/users/login', {user:data})
    if(result.data?.token) localStorage.removeItem('__kn_al')
    localStorage.setItem('__umk_of_tkn', result.data?.token)
    window.location.href="/"
    return result.data
})

export const userLogout = createAsyncThunk("users/logout", async () => {
    const result = await axios.post(host+'/users/logout', {email:localStorage.getItem('__umk_of_l')})
    if (result.status===200) {
        localStorage.removeItem('__kn_al')
        localStorage.removeItem('__umk_of_tkn')
        localStorage.removeItem('__umk_of_l')
        window.location.href="/"
    }
    
})   
const authSlice = createSlice({
    name: "users",
    initialState: {
        auth: [],
        token: null,
        login:false,
        authLoading: false,
        error: null,
    },
    reducers: {
        auth_status: (state, action) => {
            state.login = false;
        },
    },
    extraReducers: {
        [authServices.pending]: (state, action) => {
            state.authLoading = true
        },
        [authServices.fulfilled]: (state, action) => {
            state.authLoading = false
            state.auth = action.payload?.user
            state.token = action.payload?.token
        },
        [authServices.rejected]: (state, action) => {
            state.authLoading = false
            state.error = action.payload
        },
        [userLogin.pending]: (state) => {
            state.authLoading = true
        },
        [userLogin.fulfilled]: (state, action) => {
            state.authLoading = false
            state.auth = action.payload
            state.token = action.payload.token
            state.login = true
            state.error = null
        },
        [userLogin.rejected]: (state, action) => {
            state.authLoading = false
            state.error = 'error'
        }
    }
})
export const {auth_status} = authSlice.actions;
export default authSlice.reducer;