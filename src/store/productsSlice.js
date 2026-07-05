import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const HOTEL_API_URL = 'https://demohotelsapi.pythonanywhere.com/hotels?limit=50&skip=0'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch(HOTEL_API_URL)
  if (!response.ok) {
    throw new Error('Failed to load hotels')
  }
  return response.json()
})

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.data || []
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const selectAllProducts = state => state.products.items
export const selectProductById = (state, productId) =>
  state.products.items.find(item => String(item.id) === String(productId))

export default productsSlice.reducer
