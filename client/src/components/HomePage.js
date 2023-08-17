import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import Header from "./header";
import { CategoryForm, SubCategoryForm } from "./CategoryAndSubCategoryForm";
import {
  fetchTransactions,
  postTransaction,
} from "../redux/slices/transactionSlice";
import { fetchCategories, postCategory } from "../redux/slices/categorySlice";
import {
  fetchSubCategories,
  postSubCategory,
} from "../redux/slices/subCategorySlice";

const HomePage = () => {
  const transactions = useSelector((state) => state.transactions.data);
  const categories = useSelector((state) => state.categories.data);
  const subCategories = useSelector((state) => state.subCategories.data);
  const dispatch = useDispatch();

  const handleTransactionSubmission = (data) => {
    dispatch(postTransaction(data));
  };

  const handleCategorySubmission = (data) => {
    dispatch(postCategory(data));
  };

  const handleSubCategorySubmission = (data) => {
    dispatch(postSubCategory(data));
  };
  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
  }, [dispatch]);

  return (
    <div>
      <Header transactions={transactions} />
      <div className="flex w-full gap-3 max-w-6xl mx-auto">
        <div className="flex w-1/2 p-4 bg-gray-300 rounded">
          <CategoryForm handleCategorySubmission={handleCategorySubmission} />
          <SubCategoryForm
            handleSubCategorySubmission={handleSubCategorySubmission}
          />
        </div>
        <TransactionForm
          handleTransactionSubmission={handleTransactionSubmission}
          categories={categories}
          subCategories={subCategories}
        />
      </div>
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default HomePage;
