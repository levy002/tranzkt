const model = require('../models/models');

const newTransaction = async (req, res) => {
    const { name, type, category, subCategory, amount, account, time } = req.body;

   try{
     const transaction = await model.Transaction.create({ name, type, category, subCategory, account, amount, time });
     res.status(201).send({
         transaction: {
            name: transaction.name, 
            type: transaction.type, 
            category: transaction.category, 
            subCategory: transaction.subCategory, 
            amount: transaction.amount, 
            account: transaction.account,
            time: transaction.time,
            id: transaction.id
         },
         message: "Transaction created Successfully"
     })
   }catch (err) {
     res.status(400).send({
         message: 'Transaction transaction failed'
     })
   }
 };


const getAllTransactions = async (req, res) => {

    try{
        let transactions = await model.Transaction.find({});
        let data = await transactions.map( transaction => Object.assign({}, {
          name: transaction.name, 
            type: transaction.type, 
            category: transaction.category, 
            subCategory: transaction.subCategory, 
            amount: transaction.amount, 
            account: transaction.account,
            time: transaction.time,
            id: transaction._id
        }))
        res.status(200).send(data);
    }catch (err){
        res.status(400).send({
            message: 'Fetching Transactions failed'
        })
    }
};

const deleteTransaction = async (req, res) => {
    try{
        const id = req.params.id;
        await model.Transaction.findByIdAndDelete(id);
        res.status(200).send({
            message: 'Transaction deleted successfully',
            id,
        });
    } catch (err) {
        res.status(400).send({
            message: 'Deleting Transactions failed'
        })
    }
}

module.exports = {
    newTransaction,
    getAllTransactions,
    deleteTransaction
};
