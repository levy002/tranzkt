import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postSubCategoryApi, fetchSubCategoriesApi } from '../api/subCategoryApi';

const initialState = {
    subCategories: [],
    subCategoriesStatus: 'false',
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
      state.subCategoriesStatus = 'true';
    },
    [fetchSubCategories.fulfilled]: (state, action) => {
      state.subCategoriesStatus = 'false';
      state.subCategories = [...action.payload];
    },
    [fetchSubCategories.rejected]: (state) => {
      state.subCategoriesStatus = 'false';
    },
    [postSubCategory.fulfilled]: (state, action) => {
      state.subCategoriesStatus = 'false';
      state.subCategories = [...state.subCategories, action.payload.subCategory];
    },
  }
});

export default subCategoriesSlice.reducer;

