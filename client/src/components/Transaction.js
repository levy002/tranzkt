import React from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../redux/slices/transactionSlice";

const Transaction = ({ transaction }) => {
  const dispatch = useDispatch();

  const handleTransactionDelete = () => {
    dispatch(deleteTransaction(transaction.id));
  };

  const styles = (account) => {
     if(account === 'Momo') {
        return {
            backgroundColor: "#3b82f6",
          };
     } else if(account === 'Bank') {
        return {
            backgroundColor: "#9333ea",
          };
     } else {
        return {
            backgroundColor: "#d946ef"
     };
  }
};
  
  return (
    <div
      className="item flex justify-between bg-gray-50 py-2 rounded w-8/12 mx-auto cursor-pointer"
      style={{
        borderLeft: `10px solid ${
          transaction.type === "Income" ? "#16a34a" : "#ef4444"
        }`,
      }}
    >
      <div className="flex gap-5 ml-4">
        <p>{transaction.name}</p>
        <p>{transaction.amount}$</p>
      </div>
      <div className="flex gap-4">
        <p style={styles(transaction.account)} className="text-sm text-white w-16 rounded font-bold flex items-center justify-center">{transaction.account}</p>
        <p>{transaction.time}</p>
        <MdOutlineDeleteForever
          onClick={handleTransactionDelete}
          color={transaction.type === "Income" ? "#16a34a" : "#ef4444"}
          size="25px"
        />
      </div>
    </div>
  );
};

export default Transaction;
