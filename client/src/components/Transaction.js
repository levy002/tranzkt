import React from 'react';
import {MdOutlineDeleteForever} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../redux/slices/transactionSlice';


const Transaction = ({transaction}) => {
const dispatch = useDispatch();


const handleTransactionDelete = () => {
dispatch(deleteTransaction(transaction.id))
};


return (
<div className="item flex justify-between bg-gray-50 py-2 rounded w-8/12 mx-auto cursor-pointer" style={{ borderLeft : `10px solid ${ transaction.type === 'Income' ? "#16a34a" : "#ef4444"}`}}>
<div className='flex gap-5 ml-4'>
<p>{transaction.name}</p>
<p>{transaction.amount}$</p>
</div>
<div className='flex gap-4'>
<p>{transaction.time}</p>
<MdOutlineDeleteForever onClick={handleTransactionDelete} color={transaction.type === 'Income' ? "#16a34a" : "#ef4444"} size="25px"/>
</div>
</div>
)
}


export default Transaction;