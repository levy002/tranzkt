import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postSubCategoryApi, fetchSubCategoriesApi } from '../api/subCategoryApi';

const initialState = {
    data: [],
    isLoading: 'false'
};

export const fetchSubCategories = createAsyncThunk(
    'subCategories/fetch',
    async () => {
        const subCategories = await fetchSubCategoriesApi();
        return subCategories;
    }
);

export const postSubCategory = createAsyncThunk(
    'subCategory/post',
    async (subCategory) => await postSubCategoryApi(subCategory)
);

export const subCategoriesSlice = createSlice({
  name: 'subCategories',
  initialState,
  extraReducers: {
    [fetchSubCategories.pending]: (state) => {
      state.isLoading = 'true';
    },
    [fetchSubCategories.fulfilled]: (state, action) => {
      state.isLoading = 'false';
      state.data = action.payload;
    },
    [fetchSubCategories.rejected]: (state) => {
      state.isLoading = 'false';
    },
  }
});

// const { getTransactions } = transactionSlice.actions;

export default subCategoriesSlice.reducer;

