import React from 'react';
import { useForm } from 'react-hook-form';

const Header = () => {
    const Budget = 1000;
    const Wallet = 3000;
    const { register, handleSubmit, resetField } = useForm();
    const onSubmit = (data) => {
        console.log(data)
        resetField('budget');
      };

  return (
    <div className='flex justify-between px-8 py-12 mb-4 rounded-lg items-center' style={{ backgroundColor : `${ Wallet >= Budget ? "#16a34a" : "#e11d48"}`}} >
         <h1 className="text-4xl text-white rounded font-bold">TRANZKT</h1>
         
          <h3 className='font-bold text-lg italic text-red-800 bg-slate-50 px-3 py-2 rounded' style={{ display : `${ Wallet >= Budget ? "none" : "block"}`}}>Your Budget has exceeded!!!</h3>

         <div>
            <p className=''>
                <span className='font-bold text-purple-200 text-3xl'>Wallet:  </span>
                <span className='font-bold text-slate-50 text-3xl'>{Wallet}$</span>
            </p>
            <p>
                <span className='font-bold text-purple-200 text-3xl'>Budget: </span>
                <span className='font-bold text-slate-50 text-3xl'>{Budget}$</span>
            </p>
           
            <form onSubmit={handleSubmit(onSubmit)} className='flex gap-3 mt-2 justify-center'>
           <div className='w-1/3'>
              <input type='number' {...register('Budget')} placeholder='New Budget' className='w-full' required/>
           </div>

           <div className='self-center align-middle border-yellow-300'>
            <button type='submit' className='border border-lime-400 rounded px-3 bg-lime-400 text-white'>Change Budget</button>
           </div>
        </form>
         </div>
         
    </div>
  )
};

export default Header