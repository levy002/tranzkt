import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postCategoryApi, fetchCategoriesApi } from '../api/categoryApi';

const initialState = {
    categories: [],
    categoriesStatus: 'false',
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
      state.categoriesStatus = 'true';
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.categoriesStatus = 'false';
      state.categories = [...action.payload];
    },
    [fetchCategories.rejected]: (state) => {
      state.categoriesStatus = 'false';
    },
    [postCategory.fulfilled]: (state, action) => {
      state.categoriesStatus = 'false';
      state.categories = [...state.categories, action.payload.category];
    },
  }
});

export default categoriesSlice.reducer;

