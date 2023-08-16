import React from 'react';
import {MdOutlineDeleteForever} from 'react-icons/md';

const Transaction = ({transaction}) => {
  return (
    <div>
        <MdOutlineDeleteForever />
        <div>
        <p>{transaction.name}</p>
        <p>{transaction.amount}$</p>
        </div>
    </div>
  )
}

export default Transaction;