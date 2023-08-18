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
    console.log('helloooooo')
   const id = req.params.id;
   const {newAmount} = req.body;
   console.log(rep.params)

   try {
    // //   const oldBudget = model.Budget.findById(id);
    //   oldBudget.updateOne({$set: { amount: newAmount}});
      res.status(201).send({
        message: "Updating Budget Successfully"
    });
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
    newBudget,
    updateBudget
};
