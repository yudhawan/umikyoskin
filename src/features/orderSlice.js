import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { getCarts } from './cartSlice'
import {host} from './host'
import axios from 'axios'
export const makeOrder = createAsyncThunk('order/makeOrder', async (order,{dispatch}) => {
    const result = await axios.post(host+"/order/makeorder", {order:order})
    localStorage.removeItem('__kn_al')
    dispatch(getCarts())
    return result.data
})
export const cekInvoice = createAsyncThunk('order/cekInvoice', async (invoice,{dispatch}) => {
    const result = await axios.post(host+"/order/check", {inv:invoice})
    localStorage.setItem('inv', invoice)
    return result.data[0]
})
export const paymentConfirmation = createAsyncThunk('order/paymentConfirmation', async (img,{dispatch}) => {
    let invoice = localStorage.getItem('inv')
    if(invoice){
        let form = new FormData()
        form.append('image', img)
        form.append('invoice', invoice)
        const result = await axios.post(host+"/order/konfirmasi", form)
        return result.data[0]
    }
    return "Invoice empty"
})
const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        order: [],
        invoice: null,
        orderLoading: false,
        error: null,
    },
    extraReducers: {
        [makeOrder.pending]: (state, action) => {
            state.orderLoading = true
        },
        [makeOrder.fulfilled]: (state, action) => {
            state.invoice = action.payload
            state.orderLoading = false
        },
        [makeOrder.rejected]: (state, action) => {
            state.orderLoading = false
            state.error = action.error.message
        },
        [cekInvoice.pending]: (state, action) => {
            state.orderLoading = true
        },
        [cekInvoice.fulfilled]: (state, action) => {
            state.orderLoading = false
            state.order = action.payload
        },
        [cekInvoice.rejected]: (state, action) => {
            state.orderLoading = false
            state.error = action.error.message
        },
        [paymentConfirmation.pending]: (state, action) => {
            state.orderLoading = true
        },
        [paymentConfirmation.fulfilled]: (state, action) => {
            state.orderLoading = false
            state.order = action.payload
        },
        [paymentConfirmation.rejected]: (state, action) => {
            state.orderLoading = false
            state.error = action.error.message
        }
    }
})

export default orderSlice.reducer