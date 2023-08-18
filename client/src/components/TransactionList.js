import React, { useEffect, useState } from "react";
import Transaction from "./Transaction";
import Filter from "./Filter";

const TransactionList = ({ transactions }) => {
    const [beginning, setBeginning] = useState('');
    const [end, setEnd] = useState('');
    const [displayedTransactions, setDisplayedTransactions] = useState(transactions)

    const handleTransactionsSearch = (data) => {
        setBeginning(data.beginning);
        setEnd(data.end);
    };

    useEffect(() => {
        if(displayedTransactions.length === 0 && transactions.length !== 0 && beginning == '' && end == '') {
            setDisplayedTransactions(transactions);
        }
    }, [transactions, displayedTransactions]);

   useEffect(() => {
     const sortedTransactions = [...transactions].filter((t) => Date.parse(beginning) <= Date.parse(t.time) && Date.parse(t.time) <= Date.parse(end));
     setDisplayedTransactions(sortedTransactions);
   }, [beginning, end, transactions]);

   const handleAllTransactionsFilter = () => {
    setDisplayedTransactions(transactions);
    setBeginning('');
    setEnd('');
   }

  return (
    <div className="flex flex-col py-6 gap-3">
        <div className="flex justify-between w-8/12 mx-auto">
        <h2 className="py-4 font-bold text-xl">Transactions</h2>
        <div className="flex items-center gap-4">
            <button onClick={handleAllTransactionsFilter} className="text-sm border-2 border-green-500 px-2 rounded" style={transactions == displayedTransactions ? {backgroundColor: '#16a34a', color: "#fff"} : {backgroundColor: '#fff', color: "#16a34a"}}>All Transactions</button>
            <Filter handleTransactionsSearch={handleTransactionsSearch}/>
        </div>
        </div>
      
      {displayedTransactions.length === 0 ? (
        <h3>No Transactions</h3>
      ) : (
        displayedTransactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))
      )}
    </div>
  );
};

export default TransactionList;
