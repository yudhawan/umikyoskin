import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { host } from "../host";
import {authServices} from './authSlice'
import {getSellers} from '../sellers/sellersSlice'
import axios from "axios";

export const addUser = createAsyncThunk("users/addUser", async (data) => {
    const result = await axios.post(host+'/users/register', {user:data})
    return result.data
})

export const updateProfile = createAsyncThunk("users/updateProfile", async (data,{getState,dispatch}) => {
    const token = getState().auth.token
    const result = await axios.post(host+'/users/update/profil', {user:data},{headers:{'authorization': `Bearer ${token}`}})
    dispatch(authServices())
    return result.data
})
export const updateSosmed = createAsyncThunk("users/updateSosmed", async (data,{getState,dispatch}) => {
    const token = getState().auth.token
    const result = await axios.post(host+'/users/update/sosmed', {user:data},{headers:{'authorization': `Bearer ${token}`}})
    dispatch(authServices())
    return result.data
})
export const updateSetting = createAsyncThunk("users/updateSetting", async (data,{getState,dispatch}) => {
    const token = getState().auth.token
    const result = await axios.post(host+'/users/update/pengaturan', {user:data},{headers:{'authorization': `Bearer ${token}`}})
    dispatch(authServices())
    return result.data
})
export const updateRefferal = createAsyncThunk("users/updateRefferal", async (data,{getState,dispatch}) => {
    const token = getState().auth.token
    const result = await axios.post(host+'/users/update/refferal', {user:data},{headers:{'authorization': `Bearer ${token}`}})
    dispatch(authServices())
    return result.data
})
export const updatePicture = createAsyncThunk("users/updatePicture", async (data,{getState,dispatch}) => {
    const token = getState().auth.token
    let formdata = new FormData()
    formdata.append('image', data.image)
    formdata.append('email', data.email)
    let result = await axios({
        method: 'POST',
        url:host+'/users/update/picture',
        data: formdata,
        headers:{
            'authorization': `Bearer ${token}`
        }
    })
    dispatch(authServices())
    return result.data
})
export const resetPassword = createAsyncThunk("users/resetPassword", async (token) => {
    const result = await axios.post(host+"/users/resetpassword", {token:token})
    return result.data
})
export const forgetPassword = createAsyncThunk("users/forgetPassword", async (email) => {
    const result = await axios.post(host+'/users/forgetpassword', {email:email})
    return result.data
})
export const setNewPassword = createAsyncThunk("users/setNewPassword", async (data) => {
    const result = await axios.post(host+'/users/setnewpassword', {token:data.token,password:data.password})
    return result.data
})
export const acceptRef = createAsyncThunk("users/acceptRef", async (data,{dispatch,getState}) => {
    const token = getState().auth.token
    await axios({
        method:'post',
        url:host+'/users/acceptRef',
        data:{id:data},
        headers:{
            'authorization': `Bearer ${token}`
        }
    })
    dispatch(getSellers())
    return 
})
export const deleteRef = createAsyncThunk("users/deleteRef", async (data,{dispatch,getState}) => {
    const token = getState().auth.token
    await axios({
        method:'delete',
        url:host+'/users/deleteRef',
        params:{id:data},
        headers:{
            'authorization': `Bearer ${token}`
        }
    })
    dispatch(getSellers())
    return 
})
const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        status: null,
        usersLoading: false,
        error: null,
    },
    reducers: {
        resetStatus: (state) => {
            state.status = null;
        },
    },
    extraReducers: {
        [addUser.pending]: (state) => {
            state.usersLoading = true
        },
        [addUser.fulfilled]: (state, action) => {
            state.usersLoading = false
            state.status = action.payload.status
        },
        [addUser.rejected]: (state, action) => {
            state.usersLoading = false
            state.error = action.payload.status
        },
        [updateProfile.pending]: (state)=>{
            state.usersLoading = true
        },
        [updateProfile.fulfilled]: (state, action) => {
            state.usersLoading = false
            state.status = action.payload.status
        },
        [updateProfile.rejected]: (state, action) => {
            state.usersLoading = false
            state.error = action.payload.status
        },
        [updateSosmed.pending]: (state)=>{
            state.usersLoading = true
        },
        [updateSosmed.fulfilled]: (state, action) => {
            state.usersLoading = false
            state.status = action.payload.status
        },
        [updateSosmed.rejected]: (state, action) => {
            state.usersLoading = false
            state.error = action.payload.status
        },
        [updateSetting.pending]: (state)=>{
            state.usersLoading = true
        },
        [updateSetting.fulfilled]: (state, action) => {
            state.usersLoading = false
            state.status = action.payload.status
        },
        [updateSetting.rejected]: (state, action) => {
            state.usersLoading = false
            state.error = action.payload.status
        },
        [updateRefferal.pending]: (state)=>{
            state.usersLoading = true
        },
        [updateRefferal.fulfilled]: (state, action) => {
            state.usersLoading = false
            state.status = action.payload.status
        },
        [updateRefferal.rejected]: (state, action) => {
            state.usersLoading = false
            state.error = action.payload.status
        },
        [updatePicture.pending]: (state)=>{
            state.usersLoading = true
        },
        [updatePicture.fulfilled]: (state, action) => {
            state.usersLoading = false
            state.status = action.payload.status
        },
        [updatePicture.rejected]: (state, action) => {
            state.usersLoading = false
            state.error = action.payload.status
        },
        [forgetPassword.pending]: (state)=>{
            state.usersLoading = true
        },
        [forgetPassword.fulfilled]: (state, action) => {
            state.usersLoading = false
            state.status = action.payload.status
        },
        [forgetPassword.rejected]: (state, action) => {
            state.usersLoading = false
            state.error = action.payload.status
        },
        [resetPassword.pending]: (state)=>{
            state.usersLoading = true
        },
        [resetPassword.fulfilled]: (state, action) => {
            state.usersLoading = false
            state.status = action.payload.status
        },
        [resetPassword.rejected]: (state, action) => {
            state.usersLoading = false
            state.error = action.payload.status
        },
        [setNewPassword.pending]: (state)=>{
            state.usersLoading = true
        },
        [setNewPassword.fulfilled]: (state, action) => {
            state.usersLoading = false
            state.status = action.payload.status
        }
    },
});
export const {resetStatus} = usersSlice.actions;
export default usersSlice.reducer;