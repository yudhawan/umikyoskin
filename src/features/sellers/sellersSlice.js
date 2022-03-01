import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const getSellers = createAsyncThunk('sellers/getSellers', async () => {
    const response = await fetch('https://beautyshop.yashacode.com/users/getusers')
    const data = await response.json()
    return data
})
const sellersSlice = createSlice({
    name: 'sellers',
    initialState: {
        sellers: [],
        sellersLoading: false,
        error: null,
    },
    extraReducers: {
        [getSellers.pending]: (state, action) => {
            state.sellersLoading = true
        },
        [getSellers.fulfilled]: (state, action) => {
            state.sellersLoading = false
            state.sellers = action.payload
        },
        [getSellers.rejected]: (state, action) => {
            state.sellersLoading = false
            state.error = action.error.message
        },
    }
})

export default sellersSlice.reducer