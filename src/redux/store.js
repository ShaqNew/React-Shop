import { configureStore } from '@reduxjs/toolkit'
import reducerSlice from "./reducer.ts"

export const store = configureStore({
  reducer: {
    wishlist: reducerSlice,
    basket: reducerSlice
  }
})

if (window.Cypress) {
  window.store = store
}

