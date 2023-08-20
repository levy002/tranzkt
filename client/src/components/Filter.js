import React from 'react';
import { useForm } from "react-hook-form";


const Filter = ({ handleTransactionsSearch}) => {

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        handleTransactionsSearch(data);
        reset();
    }

  return (
       <form className='flex justify-between items-center gap-3' onSubmit={handleSubmit(onSubmit)}>
       <div className="flex gap-2 items-center">
          <span>From: </span>
          <input type="date" {...register("beginning")} className="w-full bg-gray-200 text-xs" />
        </div>

        <div className="flex gap-2 items-center">
            <span>To: </span>
          <input type="date" {...register("end")} className="w-full bg-gray-200 text-xs" />
        </div>

        <div className="self-center align-middle border-yellow-300">
          <button
            type="submit"
            className="border border-green-600 rounded px-3 bg-green-600 text-slate-100 text-xs py-1"
          >
            Search
          </button>
        </div>
       </form>
  )
}

export default Filter