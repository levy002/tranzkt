import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postTransactionApi, fetchTransactionsApi, deleteTransactionApi } from '../api/transactionApi';

const initialState = {
    data: [],
    isLoading: 'false',
};

export const fetchTransactions = createAsyncThunk(
    'transactions/fetch',
    async () => {
        const transactions = await fetchTransactionsApi();
        return transactions;
    }
);

export const postTransaction = createAsyncThunk(
    'transaction/post',
    async (transaction) => {
      const res = await postTransactionApi(transaction)
      return res;
    }
);

export const deleteTransaction = createAsyncThunk(
    'transaction/delete',
    async (id) => {
      const res = await deleteTransactionApi(id);
      return res;
    }
);


export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchTransactions.pending]: (state) => {
      state.isLoading = 'true';
    },
    [fetchTransactions.fulfilled]: (state, action) => {
      state.isLoading = 'false';
      state.data = [...action.payload];
    },
    [fetchTransactions.rejected]: (state, action) => {
      state.isLoading = 'false';
    },
    [postTransaction.fulfilled]: (state, action) => {
      state.isLoading = 'false';
      state.data = [...state.data, action.payload.transaction];
    },
    [deleteTransaction.fulfilled]: (state, action) => {
      state.isLoading = 'false';
      state.data = state.data.filter((t) => t.id !== action.payload.id);
    },
  }
});

export default transactionSlice.reducer;

