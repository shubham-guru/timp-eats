import { createSlice } from '@reduxjs/toolkit'
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
            totalPrice: action.payload.totalPrice,
            quantity: action.payload.quantity,
            units: action.payload.units
        }
        const product = {
            id: action.payload.id,
            productInfo: info
        }
      state.push(product)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addProduct } = addtoCartSlice.actions

export default addtoCartSlice.reducer