import { configureStore } from '@reduxjs/toolkit'
import addtoCardSlice from '../slice/addtoCardSlice'

export const store = configureStore({
  reducer: {
    products: addtoCardSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch