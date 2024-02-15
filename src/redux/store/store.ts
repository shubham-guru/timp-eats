import { configureStore } from '@reduxjs/toolkit'
import addtoCardSlice from '../slice/addtoCardSlice'
import removeProductSlice from '../slice/removeProductSlice'

export const store = configureStore({
  reducer: {
    products: addtoCardSlice,
    removeProduct: removeProductSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch