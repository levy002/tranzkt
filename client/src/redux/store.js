import { configureStore} from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import transactionsReducer from './slices/transactionSlice';
import categoriesReducer from './slices/categorySlice';
import subCategoriesReducer  from "./slices/subCategorySlice";

const reducer = combineReducers({
    transactions: transactionsReducer,
    categories: categoriesReducer,
    subCategories: subCategoriesReducer
});

const store = configureStore({reducer});

export default store;

