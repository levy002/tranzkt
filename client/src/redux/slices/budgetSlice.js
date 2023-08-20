import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateBudgetApi, fetchBudgetApi } from '../api/budgetApi';

const initialState = {
    budgetArr: [],
    budgetStatus: 'false',
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
      state.budgetStatus = 'true';
    },
    [fetchBudget.fulfilled]: (state, action) => {
      state.budgetStatus = 'false';
      state.budgetArr = [...action.payload];
    },
    [fetchBudget.rejected]: (state) => {
      state.budgetStatus = 'false';
    },
    [updateBudget.fulfilled]: (state, action) => {
      state.budgetStatus = 'false';
      state.budgetArr = [action.payload.newAmount, action.payload.message];
    },
  }
});

export default budgetSlice.reducer;

