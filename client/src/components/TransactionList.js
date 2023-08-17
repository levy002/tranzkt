import React from 'react';
import Transaction from './Transaction';


const TransactionList = ({ transactions }) => {
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