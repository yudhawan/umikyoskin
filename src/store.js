import { configureStore } from '@reduxjs/toolkit'
import  productsReducer  from './features/products/productsSlice'
import categoriesReducer from './features/categories/categoriesSlice'
import cartReducer from './features/cartSlice'
import sellersReducer from './features/sellers/sellersSlice'
export default configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    carts: cartReducer,
    sellers: sellersReducer
  },
})