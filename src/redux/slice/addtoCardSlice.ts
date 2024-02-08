import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { productInfoInterface } from '../../domain/interfaces/productInfoInterface'

export interface AddtoCartState {
  product: Array<productInfoInterface>
}

const initialState: AddtoCartState = {
  product: [],
}

export const addtoCartSlice = createSlice({
  name: 'add-to-cart',
  initialState : [],
  reducers: {
    addProduct: (state: any, action) => {
        const info = {
            img: action.payload.image,
            name: action.payload.name,
            price: action.payload.price
        }
        const product = {
            id: action.payload.id,
            productInfo: info
        }
      state.push(product)
    },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { addProduct } = addtoCartSlice.actions

export default addtoCartSlice.reducer