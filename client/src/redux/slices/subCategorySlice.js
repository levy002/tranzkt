import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postSubCategoryApi, fetchSubCategoriesApi } from '../api/subCategoryApi';

const initialState = {
    data: [],
    isLoading: 'false',
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
    async (subCategory) => {
      const res = await postSubCategoryApi(subCategory);
      return res;
    
    }
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
      state.data = [...action.payload];
    },
    [fetchSubCategories.rejected]: (state, action) => {
      state.isLoading = 'false';
    },
    [postSubCategory.fulfilled]: (state, action) => {
      state.isLoading = 'false';
      state.data = [...state.data, action.payload.subCategory];
    },
  }
});

export default subCategoriesSlice.reducer;

