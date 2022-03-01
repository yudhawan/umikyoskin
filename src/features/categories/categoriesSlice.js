import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const getCategories = createAsyncThunk('categories/getCategories', async () => {
    const response = await fetch('https://beautyshop.yashacode.com/category')
    const data = await response.json()
    return data
})

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        categoriesLoading: false,
        error: null,
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
        }
    }
})

export default categoriesSlice.reducer