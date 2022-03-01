import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    const response = await fetch('https://beautyshop.yashacode.com/products')
    const data = await response.json()
    return data
})
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        productsLoading: false,
        error: null,
    },
    extraReducers: {
        [getProducts.pending]: (state, action) => {
            state.productsLoading = true
        },
        [getProducts.fulfilled]: (state, action) => {
            state.productsLoading = false
            state.products = action.payload
        },
        [getProducts.rejected]: (state, action) => {
            state.productsLoading = false
            state.error = action.error.message
        }
    }

})

export default productsSlice.reducer