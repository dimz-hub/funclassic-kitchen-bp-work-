// redux/cartSlice.js

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: []
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const { id, name, price, quantity, image } = action.payload

      const existingItem = state.items.find(item => item.id === id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({ id, name, price, quantity, image })
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },

    increaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload)
      if (item) item.quantity++
    },

    decreaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload)
      if (item && item.quantity > 1) item.quantity--
    }

  }
})

export const { addToCart, removeFromCart, increaseQty, decreaseQty } = cartSlice.actions
export default cartSlice.reducer