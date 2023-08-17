import React from 'react';
import { useForm } from 'react-hook-form';


export const CategoryForm = ({handleCategorySubmission}) => {
const { register, handleSubmit, resetField } = useForm();


const onSubmit = (data) => {
handleCategorySubmission(data)
resetField('name');
};
return (
<div>
<h2 className='py-2 font-bold text-xl'>New Category</h2>


<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 items-center mt-2'>
<div className='w-8/12'>
<input type='text' {...register('name')} placeholder='Category name' className='w-full' required/>
</div>


<div className='self-center align-middle border-yellow-300'>
<button type='submit' className='border border-green-600 rounded px-3 bg-green-600 text-slate-100'>Save</button>
</div>
</form>
</div>
)
}


export const SubCategoryForm = ({handleSubCategorySubmission}) => {
const { register, handleSubmit, resetField } = useForm();
const onSubmit = (data) => {
handleSubCategorySubmission(data)
console.log(data)
resetField('name');
};


return (
<div>
<h2 className='py-2 font-bold text-xl'>New SubCategory</h2>


<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 items-center mt-2'>
<div className='w-8/12'>
<input type='text' {...register('name')} placeholder='SubCategory name' className='w-full' required/>
</div>


<div className='self-center align-middle border-yellow-300'>
<button type='submit' className='border border-green-600 rounded px-3 bg-green-600 text-slate-100'>Save</button>
</div>
</form>
</div>
)
};
