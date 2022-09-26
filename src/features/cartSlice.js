import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {host} from './host'
export const addProductToCart = createAsyncThunk('cart/addProductToCart', async (product) => {
    let cart = []
    try {
        cart = await JSON.parse(localStorage.getItem('__kn_al'))
    } catch (error) {
        
    }
    let initialCart = cart&&cart.find(val => val.id===product.id)
    if(initialCart){
        let olditems = cart.filter(val => val.id!==product.id)
        let newitems = cart.filter(val => val.id===product.id)
        let qty = (newitems[0].qt===product.stock)?newitems[0].qt:newitems[0].qt+1
        newitems[0]={...newitems[0], qt:qty}
        olditems.push(newitems[0])
        localStorage.setItem('__kn_al', JSON.stringify(olditems))
        return olditems
    }
    cart?cart=[...cart,{id: product.id, qt:1}]:cart=[{id: product.id, qt:1}]
    localStorage.setItem('__kn_al', JSON.stringify(cart))
    return cart
    
})

export const incrementProductQty = createAsyncThunk('cart/incrementProductQty', async (id, {dispatch,getState}) => {
    let cart = []
    try {
        cart = await JSON.parse(localStorage.getItem('__kn_al'))
    } catch (error) {
        cart = []
    }
    if (cart) {
        const newdata = cart.map(value => {
            if (value.id === id) value.qt = (value.qt===value.stock)?value.qt:value.qt+1
            return value
        })
        localStorage.setItem('__kn_al', JSON.stringify(newdata))
        dispatch(getBasket())
        return newdata
    }
})

export const decrementProductQty = createAsyncThunk('cart/decrementProductQty', async (id, {dispatch}) => {
    let cart = []
    try {
        cart = await JSON.parse(localStorage.getItem('__kn_al'))
    } catch (error) {
        cart = []
    }
    if (cart) {
        const newdata = cart.map(value => {
            if (value.id === id) value.qt = (value.qt===value.stock)?value.qt:value.qt-1
            if(value.qt===0) value.qt=1
            return value
        })
        localStorage.setItem('__kn_al', JSON.stringify(newdata))
        dispatch(getBasket())
        return newdata
    }
})
export const getCarts = createAsyncThunk('cart/getCarts', async (id, {rejectWithValue}) => {
    let cart = []
    try {
        cart = await JSON.parse(localStorage.getItem('__kn_al'))
    } catch (error) {
        cart = []
    }
    return cart
})
export const deleteItem = createAsyncThunk('cart/deleteItem', async (id, {dispatch}) => {
    let cart = []
    try {
        cart = await JSON.parse(localStorage.getItem('__kn_al'))
    } catch (error) {
        cart = []
    }
    if (cart) {
        const newdata = cart.filter(value => value.id!==id)
        localStorage.setItem('__kn_al', JSON.stringify(newdata))
        dispatch(getBasket())
        return newdata
    }
})
// create function get cart 
export const getBasket = createAsyncThunk('cart/getCart', async (arg,{getState}) => {
    const token = getState().auth.token
    let cart = []
    let products
    try {
        const response = await fetch(host+'/products')
        products = await response.json()
    } catch (error) {
        cart = []
    }
    let basket =[]
    cart = await JSON.parse(localStorage.getItem('__kn_al'))
    if(token){
        cart&&cart.map(value=>{
            let tmp = products.filter(val=> {
                if(val.id===value.id){
                    val.quantity=value.qt
                    val.fixprice = (val.quantity>=val.grosir_min & val.grosir_min!==null)?val.grosir_price:val.price
                    return val
                }
            })
            basket.push(tmp[0])
        })

    }else{
        cart&&cart.map(value=>{
            let tmp = products.filter(val=> {
                if(val.id===value.id){
                    val.quantity=value.qt
                    val.fixprice = val.price
                    return val
                }
            })
            basket.push(tmp[0])
        })
    }
    
    return basket
})



const cartSlice = createSlice({
    name: 'carts',
    initialState: {
        carts: [],
        basket: [],
        basketLoading: false,
        cartLoading: false,
        error: null,
    },
    extraReducers: {
        [addProductToCart.pending]: (state) => {
            state.cartLoading = true
        },
        [addProductToCart.fulfilled]: (state, action) => {
            state.cartLoading = false
            state.carts = action.payload
        },
        [addProductToCart.rejected]: (state, action) => {
            state.cartLoading = false
            state.error = action.payload
        },
        [deleteItem.fulfilled]: (state, action) => {
            state.carts = action.payload
        },
        [incrementProductQty.fulfilled]: (state, action) => {
            state.carts = action.payload
        },
        [decrementProductQty.fulfilled]: (state, action) => {
            state.carts = action.payload
        },
        [getCarts.fulfilled]: (state, action) => {
            state.carts = action.payload
        },
        [getBasket.pending]: (state) => {
            state.basketLoading = true
        },
        [getBasket.fulfilled]: (state, action) => {
            state.basketLoading = false
            state.basket = action.payload
        },
        [getBasket.rejected]: (state, action) => {
            state.basketLoading = false
            state.error = action.payload
        },
        [deleteItem.fulfilled]: (state, action) => {
            state.carts = action.payload
        },
        [incrementProductQty.fulfilled]: (state, action) => {
            state.carts = action.payload
        },
        [decrementProductQty.fulfilled]: (state, action) => {
            state.carts = action.payload
        },
    }
})
export default cartSlice.reducer