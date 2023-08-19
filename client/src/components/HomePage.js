import React, { useEffect, useMemo, useCallback } from "react";
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

  const sortedTransactions = useMemo(
    () =>
      transactions && transactions.length !== 0
        ? [...transactions].sort((a, b) =>
            Date.parse(b.time) > Date.parse(a.time) ? 1 : -1
          )
        : [],
    [transactions]
  );

  const handleTransactionSubmission = useCallback(
    async (data) => {
      const createdTransaction = await dispatch(postTransaction(data));

      if (createdTransaction.type === "transaction/post/fulfilled") {
        dispatch(fetchTransactions());
      }
    },
    [dispatch]
  );

  const handleCategorySubmission = useCallback(
    async (data) => {
      const createdCategory = await dispatch(postCategory(data));

      if (createdCategory.type === "category/post/fulfilled") {
        dispatch(fetchCategories());
      }
    },
    [dispatch]
  );

  const handleSubCategorySubmission = useCallback(
    async (data) => {
      const createdSubCategory = await dispatch(postSubCategory(data));

      if (createdSubCategory.type === "subCategory/post/fulfilled") {
        dispatch(fetchSubCategories());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
  }, [dispatch]);

  return (
    <div>
      <Header transactions={transactions} />
      <div className="flex w-full gap-3 max-w-6xl mx-auto">
        <div className="flex flex-col w-1/2 p-4 bg-gray-300 rounded">
          <h2 className="font-bold text-lg mb-2">
            ADD NEW EXPENSE CATEGORY OR SUBCATEGORY
          </h2>
          <div className="flex">
            <CategoryForm handleCategorySubmission={handleCategorySubmission} />
            <SubCategoryForm
              handleSubCategorySubmission={handleSubCategorySubmission}
            />
          </div>
        </div>
        <TransactionForm
          handleTransactionSubmission={handleTransactionSubmission}
          categories={categories}
          subCategories={subCategories}
        />
      </div>
      <TransactionList transactions={sortedTransactions} />
    </div>
  );
};

export default HomePage;
