import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../API/currencyApi';

const initialState = {
  value: [],
  status: 'idle',
};

export const fetchDataAsync = createAsyncThunk(
  'currency/fetchData',
  async () => {
    const response = await fetchData('');
    return response;
  }
);

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setData: (state, action) => [...state, action.payload],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDataAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export const { setData } = currencySlice.actions;

export const selectData = (state) => state.currency;

export default currencySlice.reducer;

