import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from 'Redux/currencySlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
});
