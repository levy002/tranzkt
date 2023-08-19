import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postCategoryApi, fetchCategoriesApi } from '../api/categoryApi';

const initialState = {
    data: [],
    isLoading: 'false',
};

export const fetchCategories = createAsyncThunk(
    'categories/fetch',
    async () => {
        const categories = await fetchCategoriesApi();
        return categories;
    }
);

export const postCategory = createAsyncThunk(
    'category/post',
    async (category) => {
      const res = await postCategoryApi(category)
      return res;
    }
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.isLoading = 'true';
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.isLoading = 'false';
      state.data = [...action.payload];
    },
    [fetchCategories.rejected]: (state, action) => {
      state.isLoading = 'false';
    },
    [postCategory.fulfilled]: (state, action) => {
      state.isLoading = 'false';
      state.data = [...state.data, action.payload.category];
    },
  }
});

export default categoriesSlice.reducer;

