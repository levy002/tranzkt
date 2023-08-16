import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Transaction from './Transaction';
import { fetchTransactions } from '../redux/slices/transactionSlice';

const TransactionList = () => {
    const transactions = useSelector((state) => state.transactions.data);
    const dispatch = useDispatch();
   
    useEffect(() => {
           dispatch(fetchTransactions());
    }, [dispatch]);

  return (
    <div className="flex flex-col py-6 gap-3">
        <h2 className='py-4 font-bold text-xl'>Transactions History</h2>
        {
            transactions.length === 0 ? (
                <h3>No Transactions</h3>
            ) : (
                transactions.map((transaction) => (
                    <Transaction key={transaction.id} transaction={transaction} />
                ))
            )
        }
    </div>
  )
}

export default TransactionList;