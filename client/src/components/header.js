import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchBudget,  updateBudget } from "../redux/slices/budgetSlice";

const Header = ({ transactions }) => {
  const [cashBalance, setCashBalance] = useState(0);
  const [bankBalance, setBankBalance] = useState(0);
  const [momoBalance, setMomoBalance] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [budget, setBudget] = useState(0);
  const [budgetErr, setBudgetErr] = useState('none');
  const [budgetColor, setBudgetColor] = useState('green')
  const dispatch = useDispatch();
  const {budgetArr} = useSelector((state) => state.budget);
  const [updateBudgetStatus, setUpdateBudgetStatus] = useState(false);

  const { register, handleSubmit, resetField } = useForm();

  const onSubmit = useCallback( async (data) => {
    setUpdateBudgetStatus(true)
   await dispatch(updateBudget({budget: data, id: budgetArr[0].id}))
    .then(() => {
      setUpdateBudgetStatus(false)
      dispatch(fetchBudget());
      resetField("amount");
    })
    .catch((err) => {
      throw err;
    })

  }, [budgetArr, dispatch, resetField]);

  useEffect(() => {
    budgetArr[0] && setBudget(budgetArr[0].amount)
  }, [budgetArr])

const calculateBalancesAndExpenses = useCallback(() => {
  const allExpenses = {
    momo: transactions.filter((t) => t.account === 'Momo' && t.type === 'Expense').reduce((total, t) => total + Number(t.amount), 0),
    bank: transactions.filter((t) => t.account === 'Bank' && t.type === 'Expense').reduce((total, t) => total + Number(t.amount), 0),
    cash: transactions.filter((t) => t.account === 'Cash' && t.type === 'Expense').reduce((total, t) => total + Number(t.amount), 0),
    total: transactions.filter((t) => t.type === 'Expense').reduce((total, t) => total + Number(t.amount), 0),
  };

  const allIncomes = {
    momo: transactions.filter((t) => t.account === 'Momo' && t.type === 'Income').reduce((total, t) => total + Number(t.amount), 0),
    bank: transactions.filter((t) => t.account === 'Bank' && t.type === 'Income').reduce((total, t) => total + Number(t.amount), 0),
    cash: transactions.filter((t) => t.account === 'Cash' && t.type === 'Income').reduce((total, t) => total + Number(t.amount), 0),
  };

allExpenses.momo > allIncomes.momo ? setMomoBalance(0) : setMomoBalance(allIncomes.momo - allExpenses.momo);
allExpenses.bank > allIncomes.bank ? setMomoBalance(0) : setBankBalance(allIncomes.bank - allExpenses.bank);
allExpenses.cash > allIncomes.cash ? setMomoBalance(0) : setCashBalance(allIncomes.cash - allExpenses.cash);

setTotalExpenses(allExpenses.total)

  setBudgetColor(budget < allExpenses.total ? 'red' : 'green');
  setBudgetErr(budget < allExpenses.total ? 'block' : 'none');

}, [budget, transactions]);

useEffect(() => {
  dispatch(fetchBudget());
  calculateBalancesAndExpenses();
}, [dispatch, calculateBalancesAndExpenses]);

  return (
   <div 
   className="px-8  py-4 mb-4"
   style={{
      backgroundColor: budgetColor,
    }}>
   <h1 className="text-3xl text-white rounded font-bold mb-4">TRANSACTION MANAGER</h1>
    <div
      className="flex justify-between items-center"
    >
        <div className="flex flex-col items-start w-1/3">
          <p className="">
            <span className="font-bold text-purple-200 text-xl">
              Cash Balance:{" "}
            </span>
            <span className="font-bold text-slate-50 text-xl">
              {cashBalance}$
            </span>
          </p>
          <p>
            <span className="font-bold text-purple-200 text-xl">
              Bank Balance:{" "}
            </span>
            <span className="font-bold text-slate-50 text-xl">{bankBalance}$</span>
          </p>
          <p>
            <span className="font-bold text-purple-200 text-xl">
              Momo Balance:{" "}
            </span>
            <span className="font-bold text-slate-50 text-xl">{momoBalance}$</span>
          </p>
        </div>

      <h3
        className="font-bold text-lg italic text-red-800 bg-slate-50 px-3 py-2 rounded"
        style={{ display: budgetErr }}
      >
        Your Budget has exceeded!!!
      </h3>

      <div className="flex flex-col items-end w-1/3">
        <p className="">
          <span className="font-bold text-purple-200 text-xl">Expenses: </span>
          <span className="font-bold text-slate-50 text-xl">
            {totalExpenses}$
          </span>
        </p>
        <p>
          <span className="font-bold text-purple-200 text-xl">Budget: </span>
          <span className="font-bold text-slate-50 text-xl">{budget}$</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 mt-2">
          <div className="w-36">
            <input
              type="number"
              {...register("amount", {
                valueAsNumber: true,
                validate: (value) => value >= 0,
              })}
              placeholder="Update Budget"
              className="w-full text-sm"
              required
            />
          </div>

          <div className="self-center align-middle border-yellow-300">
            {
              updateBudgetStatus ? (<button
              disabled
              className="w-20 border border-gray-600 rounded px-3 py-1 text-sm bg-gray-600 text-white"
            >
              Saving...
            </button>) : (
              <button
              type="submit"
              className="w-20 border border-lime-400 rounded px-3 py-1 text-sm bg-lime-400 text-white"
            >
              Save
            </button>
            )
            }
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Header;
