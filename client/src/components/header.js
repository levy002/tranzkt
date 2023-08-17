import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { fetchBudget, postBudget } from '../redux/slices/budgetSlice';

const Header = ({transactions}) => {
  const dispatch = useDispatch();
  const budgetArr = useSelector((state) => state.budget.data);
  const budget = budgetArr.length === 0 ? 0 : budgetArr[0].amount

  const expenses = transactions.filter(t => t.type === 'Expenses');
  const totalExpenses = expenses.reduce((a, b) =>  { return a + Number(b.amount)}, 0);

    const { register, handleSubmit, resetField } = useForm();
    const onSubmit = (data) => {
       dispatch(postBudget(data))
        resetField('amount');
      };
      
      useEffect(() => {
         dispatch(fetchBudget());
      }, dispatch);

  return (
    <div className='flex justify-between px-8 py-12 mb-4 rounded-lg items-center' style={{ backgroundColor : `${ budget >= totalExpenses ? "#16a34a" : "#e11d48"}`}} >
         <h1 className="text-4xl text-white rounded font-bold">TRANZKT</h1>
         
          <h3 className='font-bold text-lg italic text-red-800 bg-slate-50 px-3 py-2 rounded' style={{ display : `${ budget >= totalExpenses ? "none" : "block"}`}}>Your Budget has exceeded!!!</h3>

         <div className='flex flex-col items-start w-1/3'>
            <p className=''>
                <span className='font-bold text-purple-200 text-xl'>Total Expenses:  </span>
                <span className='font-bold text-slate-50 text-xl'>{totalExpenses}$</span>
            </p>
            <p>
                <span className='font-bold text-purple-200 text-xl'>My Budget: </span>
                <span className='font-bold text-slate-50 text-xl'>{budget}$</span>
            </p>
           
            <form onSubmit={handleSubmit(onSubmit)} className='flex gap-3 mt-2'>
           <div className='w-32'>
              <input type='number' {...register('amount', {valueAsNumber: true, validate: (value) => value > 0})} placeholder='New Budget' className='w-full text-sm' required/>
           </div>

           <div className='self-center align-middle border-yellow-300'>
            <button type='submit' className='border border-lime-400 rounded px-3 py-1 text-sm bg-lime-400 text-white'>Save</button>
           </div>
        </form>
         </div>
         
    </div>
  )
};

export default Header