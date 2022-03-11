import { createSlice } from '@reduxjs/toolkit';

const shopcartSlice = createSlice({
  name: 'shopcart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    add: (state, action) => {
      state.products.push(action.payload); // updates initial state with product details.
      state.quantity++;
      state.total += action.payload.quantity * action.payload.price;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { add, reset } = shopcartSlice.actions;
export default shopcartSlice.reducer;
