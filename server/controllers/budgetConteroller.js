const model = require('../models/models');

const newBudget = async (req, res) => {
   const { amount } = req.body;

  try{
    const budget = await model.Budget.create({ amount });
    res.status(201).send({
        budget: {
            amount: budget.amount
        },
        message: "Updated Budget Successfully"
    })
  }catch (err) {
    res.status(400).send({
        message: 'Updating Budget failed'
    })
  }
};


const getBudget = async (req, res) => {

    try{
        let budget = await model.Budget.find({});
        let data = await budget.map( budget => Object.assign({}, {amount: budget.amount, id: budget._id}))
        res.status(200).send(data);
    }catch (err){
        res.status(400).send({
            message: 'Fetching budget failed'
        })
    }
};

module.exports = {
    getBudget,
    newBudget
};
