import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/slices/categorySlice';
import { fetchSubCategories } from '../redux/slices/subCategorySlice';

const TransactionForm = () => {
  const { register, handleSubmit, resetField } = useForm();

  const categories = useSelector((state => state.categories.data));
  const subCategories = useSelector((state) => state.subCategories.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
  }, [dispatch])

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
        <h1>Transaction</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
           <div>
              <input type='text' {...register('name')} placeholder='Income or expense' required/>
           </div>

           <select {...register('type')}>
              <option value="Income">Income</option>
              <option value="Expenses">Expense</option>
           </select>

           <select>
              {
               categories.map(category => (
                  <option key={category.id}>{category.name}</option>
               ))
              }
           </select>

           <select>
              {
               subCategories.map(subCategory => (
                  <option key={subCategory.id}>{subCategory.name}</option>
               ))
              }
           </select>

           <div>
              <input type='number' {...register('amount')} placeholder='Amount' required />
           </div>

           <div>
            <button type='submit'>Save Transaction</button>
           </div>
        </form>
    </div>
  )
}

export default TransactionForm;
