import { createSlice } from '@reduxjs/toolkit'
import { productInfoInterface } from '../../domain/interfaces/productInfoInterface'

export interface RemoveProductState {
    removeProduct: Array<productInfoInterface>
}

const initialState: RemoveProductState = {
    removeProduct: [],
}

export const removeProductSlice = createSlice({
  name: 'remove-product',
  initialState : [],
  reducers: {
    removeProduct: (state: any, action) => {
       console.log("🚀 ~ state:", state)
       
       
    //   state.push(product)
    }
  },
})

// Action creators are generated for each case reducer function
export const { removeProduct } = removeProductSlice.actions

export default removeProductSlice.reducer