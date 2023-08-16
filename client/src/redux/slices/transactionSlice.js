import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postTransactionApi, fetchTransactionsApi, deleteTransactionApi } from '../api/transactionApi';

const initialState = {
    data: [],
    isLoading: 'false'
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
    async (transaction) => await postTransactionApi(transaction)
);

export const deleteTransaction = createAsyncThunk(
    'transaction/delete',
    async (id) => {
      const res = await deleteTransactionApi(id);
      console.log(res, id, '%%%%%%%')
      return res
    }
);


export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  extraReducers: {
    [fetchTransactions.pending]: (state) => {
      state.isLoading = 'true';
    },
    [fetchTransactions.fulfilled]: (state, action) => {
      state.isLoading = 'false';
      state.data = action.payload;
    },
    [fetchTransactions.rejected]: (state) => {
      state.isLoading = 'false';
    },
  }
});

// export const { postTransaction, deleteTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;

