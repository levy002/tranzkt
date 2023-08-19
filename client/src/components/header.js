import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchBudget, updateBudget } from "../redux/slices/budgetSlice";

const Header = ({ transactions }) => {
  const [cashBalance, setCashBalance] = useState(0);
  const [bankBalance, setBankBalance] = useState(0);
  const [momoBalance, setMomoBalance] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const dispatch = useDispatch();
  const budgetArr = useSelector((state) => state.budget.data);
  const budget = budgetArr.length === 0 ? 0 : budgetArr[0].amount;

  const { register, handleSubmit, resetField } = useForm();

  const onSubmit = useCallback( async (data) => {
   await dispatch(updateBudget({budget: data, id: budgetArr[0].id}))
    .then(() => {
      dispatch(fetchBudget());
      resetField("amount");
    })
    .catch((err) => {
      throw err;
    })

  }, [budgetArr]);

  useEffect(() => {
    dispatch(fetchBudget());
  }, [dispatch]);
  

  const updateBalance = useCallback((transaction, account, setNewBalanceFunction ) => {
   let total = 0;
   if(transaction.account === account){
      if(transaction.type === 'Expense' && total !== 0) {
         total -= transaction.amount;
      } else if(transaction.type === 'Income'){
         total += transaction.amount;
      }
      setNewBalanceFunction(total);
  }
}, [transactions]);


useEffect(() => {
 transactions.map((t) => {
   if(t.account === 'Momo') {
      updateBalance(t, 'Momo', setMomoBalance);
   } else if(t.account == "Bank") {
      updateBalance(t, "Bank", setBankBalance);
   } else if(t.account === "Cash") {
      updateBalance(t, "Cash", setCashBalance);
   };


   const expenses = transactions.filter((t) => t.type === "Expense").reduce((a, b) => {
      return a + Number(b.amount);
    }, 0);

    setTotalExpenses(expenses);
 })


}, [transactions]);

  return (
   <div 
   className="px-8  py-4 mb-4"
   style={{
      backgroundColor: `${budget >= totalExpenses ? "#16a34a" : "#e11d48"}`,
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
        style={{ display: `${budget >= totalExpenses ? "none" : "block"}` }}
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
          <div className="w-32">
            <input
              type="number"
              {...register("amount", {
                valueAsNumber: true,
                validate: (value) => value > 0,
              })}
              placeholder="New Budget"
              className="w-full text-sm"
              required
            />
          </div>

          <div className="self-center align-middle border-yellow-300">
            <button
              type="submit"
              className="border border-lime-400 rounded px-3 py-1 text-sm bg-lime-400 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Header;
