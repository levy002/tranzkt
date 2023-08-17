import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postBudgetApi, fetchBudgetApi } from '../api/budgetApi';

const initialState = {
    data: [],
    isLoading: 'false'
};

export const fetchBudget = createAsyncThunk(
    'budget/fetch',
    async () => {
        const budget = await fetchBudgetApi();
        return budget;
    }
);

export const postBudget = createAsyncThunk(
    'budget/post',
    async (budget) => await postBudgetApi(budget)
);

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  extraReducers: {
    [fetchBudget.pending]: (state) => {
      state.isLoading = 'true';
    },
    [fetchBudget.fulfilled]: (state, action) => {
      state.isLoading = 'false';
      state.data = action.payload;
    },
    [fetchBudget.rejected]: (state) => {
      state.isLoading = 'false';
    },
  }
});

export default budgetSlice.reducer;

