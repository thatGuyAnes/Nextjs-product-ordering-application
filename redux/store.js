import { configureStore } from '@reduxjs/toolkit';
import shopcartReducer from './shopcartSlice';

export default configureStore({
  reducer: {
    shopcart: shopcartReducer,
  },
});
