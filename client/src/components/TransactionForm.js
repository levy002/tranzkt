import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


const TransactionForm = ({handleTransactionSubmission, categories, subCategories}) => {
const { register, handleSubmit, reset } = useForm();


const onSubmit = (data) => {
handleTransactionSubmission(data);
reset();
};


return (
<div className='flex w-1/2 p-4 flex-col bg-gray-300 rounded'>
<h2 className='pb-2 font-bold text-xl'>New Transaction</h2>


<form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-wrap gap-2 justify-center'>
<div className='w-1/3'>
<input type='text' {...register('name')} placeholder='Transaction name' className='w-full' required/>
</div>


<select {...register('type')} className='w-1/4' required>
<option value="" disabled selected>Trans. Type</option>
<option value="Income">Income</option>
<option value="Expenses">Expense</option>
</select>


<select {...register('category')} className='w-1/3'>
<option value="" disabled selected>Select Category</option>
{
categories.map(category => (
<option key={category.id}>{category.name}</option>
))
}
</select>


<select {...register('subCategory')} className='w-1/3'>
<option disabled value="" selected>Select SubCategory</option>
{
subCategories.map(subCategory => (
<option key={subCategory.id}>{subCategory.name}</option>
))
}
</select>


<div className='w-1/4'>
<input type='number' {...register('amount')} placeholder='Amount' className='w-full' required />
</div>


<div className='w-1/3'>
<input type='date' {...register('time')} className='w-full'/>
</div>
<div className='self-center align-middle border-yellow-300'>
<button type='submit' className='border border-green-600 rounded px-3 bg-green-600 text-slate-100'>Save Transaction</button>
</div>
</form>
</div>
)
}


export default TransactionForm;