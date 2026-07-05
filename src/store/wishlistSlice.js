import { createSlice } from '@reduxjs/toolkit'

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  },
  reducers: {
    addToWishlist(state, action) {
      const existing = state.items.find(item => item.id === action.payload.id)
      if (!existing) {
        state.items.push(action.payload)
      }
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
  },
})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
