import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice.js'
import wishlistReducer from './wishlistSlice.js'

const store = configureStore({
  reducer: {
    products: productsReducer,
    wishlist: wishlistReducer,
  },
})

export default store
