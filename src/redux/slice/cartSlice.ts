import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productDetails: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state: any, action) => {
      const info = {
        img: action.payload.image,
        name: action.payload.name,
        totalPrice: Number(action.payload.totalPrice.toFixed(2)),
        quantity: action.payload.quantity,
        qtyLabel: action.payload.qtyLabel,
        units: action.payload.units
      };
      const product = {
        id: action.payload.id,
        productInfo: info
      };
      state.productDetails.push(product);
    },
    removeProduct: (state, action) => {
      const idToRemove = action.payload;
      const indexToRemove = state.productDetails.findIndex((product: any) => product.id === idToRemove);
      if (indexToRemove !== -1) {
        const updatedProductDetails = [...state.productDetails.slice(0, indexToRemove), ...state.productDetails.slice(indexToRemove + 1)];
        state.productDetails = updatedProductDetails;
      } else {
        console.log("Product not found!");
      }
    },
    removeAllProducts: (state) => {
      state.productDetails = []
    }
  },
});


// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, removeAllProducts } = cartSlice.actions

export default cartSlice.reducer