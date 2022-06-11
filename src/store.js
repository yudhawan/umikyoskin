import { configureStore } from '@reduxjs/toolkit'
import  productsReducer  from './features/products/productsSlice'
import categoriesReducer from './features/categories/categoriesSlice'
import cartReducer from './features/cartSlice'
import sellersReducer from './features/sellers/sellersSlice'
import usersReducer from './features/users/usersSlice'
import authReducer from './features/users/authSlice'
import ordersReducer from './features/orderSlice'
export default configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    carts: cartReducer,
    sellers: sellersReducer,
    users: usersReducer,
    orders: ordersReducer,
    auth: authReducer
  },
  devTools: false
})