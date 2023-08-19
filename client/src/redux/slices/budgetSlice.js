import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateBudgetApi, fetchBudgetApi } from '../api/budgetApi';

const initialState = {
    data: [],
    isLoading: 'false',
};

export const fetchBudget = createAsyncThunk(
    'budget/fetch',
    async () => {
        const budget = await fetchBudgetApi();
        return budget;
    }
);

export const updateBudget = createAsyncThunk(
    'budget/put',
    async ({budget, id}) => {
      const newBudget = await updateBudgetApi(budget, id);
      return newBudget;
    }
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
    [fetchBudget.rejected]: (state, action) => {
      state.isLoading = 'false';
    },
    [updateBudget.fulfilled]: (state, action) => {
      state.isLoading = 'false';
      state.data = [action.payload, action.payload.message];
    },
  }
});

export default budgetSlice.reducer;

