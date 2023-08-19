import React, { useEffect, useMemo, useCallback, useState } from "react";
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
  const {transactions} = useSelector((state) => state.transactions);
  const {categories} = useSelector((state) => state.categories);
  const {subCategories} = useSelector((state) => state.subCategories);
  const [newTransactionStatus, setNewTransactionStatus] = useState(false);
  const [newCategorytatus, setNewCategoryStatus] = useState(false);
  const [newSubCategoryStatus, setNewSubCategoryStatus] = useState(false);
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
      setNewTransactionStatus(true)
      const createdTransaction = await dispatch(postTransaction(data));

      if (createdTransaction.type === "transaction/post/fulfilled") {
        dispatch(fetchTransactions());
        setNewTransactionStatus(false)
      }
    },
    [dispatch]
  );

  const handleCategorySubmission = useCallback(
    async (data) => {
      setNewCategoryStatus(true)
      const createdCategory = await dispatch(postCategory(data));

      if (createdCategory.type === "category/post/fulfilled") {
        setNewCategoryStatus(false)
        dispatch(fetchCategories());
      }
    },
    [dispatch]
  );

  const handleSubCategorySubmission = useCallback(
    async (data) => {
      setNewSubCategoryStatus(true)
      const createdSubCategory = await dispatch(postSubCategory(data));

      if (createdSubCategory.type === "subCategory/post/fulfilled") {
        setNewSubCategoryStatus(false)
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
            <CategoryForm handleCategorySubmission={handleCategorySubmission} isLoading={newCategorytatus} />
            <SubCategoryForm
              isLoading={newSubCategoryStatus}
              handleSubCategorySubmission={handleSubCategorySubmission}
            />
          </div>
        </div>
        <TransactionForm
          handleTransactionSubmission={handleTransactionSubmission}
          categories={categories}
          subCategories={subCategories}
          isLoading={newTransactionStatus}
        />
      </div>
      <TransactionList transactions={sortedTransactions} />
    </div>
  );
};

export default HomePage;
