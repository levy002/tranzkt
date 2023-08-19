const model = require('../models/models');

const newBudget = async (req, res) => {
  try{
    const budget = new model.Budget({
        amount: 0
    });

    budget.save();
    res.status(201).send({
        budget,
        message: "Creating Budget Successfully"
    });

  }catch (err) {
    res.status(400).send({
        message: 'Creating Budget failed'
    })
  }
};

const updateBudget = async (req, res) => {
   const id = req.params.id;
   const {amount} = req.body;
   try {
       await model.Budget.findByIdAndUpdate(id, {amount});
      res.status(201).send({
        newBudget: {amount},
        message: "Updating Budget Successfully"
    });
   }catch (err) {
    console.log(err)
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
    newBudget,
    updateBudget
};
