import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {host} from '../host'
export const getCategories = createAsyncThunk('categories/getCategories', async () => {
    const response = await fetch('https://beautyshop.yashacode.com/category')
    const data = await response.json()
    return data
})

export const getbanners = createAsyncThunk('banners/getbanners', async () => {
    const response = await fetch('https://beautyshop.yashacode.com/dashboard/getbanners')
    const data = await response.json()
    return data
})
export const getTestimony = createAsyncThunk('testimony/getTestimony', async () => {
    const response = await fetch('https://beautyshop.yashacode.com/dashboard/testimony')
    const data = await response.json()
    return data
})

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        categoriesLoading: false,
        error: null,
        banners: [],
        testimony:[],
        bannersLoading: false,
    },
    extraReducers: {
        [getCategories.pending]: (state, action) => {
            state.categoriesLoading = true
        },
        [getCategories.fulfilled]: (state, action) => {
            state.categoriesLoading = false
            state.categories = action.payload
        },
        [getCategories.rejected]: (state, action) => {
            state.categoriesLoading = false
            state.error = action.error.message
        },
        [getbanners.pending]: (state) => {
            state.bannersLoading = true
        },
        [getbanners.fulfilled]: (state, action) => {
            state.bannersLoading = false
            state.banners = action.payload
        },
        [getbanners.rejected]: (state, action) => {
            state.bannersLoading = false
            state.error = action.payload
        },
        [getTestimony.pending]: (state) => {
            state.bannersLoading = true
        },
        [getTestimony.fulfilled]: (state, action) => {
            state.bannersLoading = false
            state.testimony = action.payload
        },
        [getTestimony.rejected]: (state, action) => {
            state.bannersLoading = false
            state.error = action.payload
        }
    }
})

export default categoriesSlice.reducer