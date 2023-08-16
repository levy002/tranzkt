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
        console.log(transactions, '$$$$$')
        return transactions;
    }
);

export const postTransaction = createAsyncThunk(
    'transaction/post',
    async (transaction) => await postTransactionApi(transaction)
);

export const deleteTrnsaction = createAsyncThunk(
    'transaction/delete',
    async (id) => await deleteTransactionApi(id)
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

// const { getTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;

