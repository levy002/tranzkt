const model = require('../models/models');

const newSubCategory = async (req, res) => {
   const { name } = req.body;

  try{
    const subCategory = await model.SubCategory.create({ name });
    res.status(201).send({
        subCategory: {
            name: subCategory.name,
            id: subCategory.id
        },
        message: "subCategory created Successfully"
    })
  }catch (err) {
    res.status(400).send({
        message: 'Creating subCategory failed'
    })
  }
};


const getAllSubCategories = async (req, res) => {

    try{
        let subCategories = await model.SubCategory.find({});
        let data = await subCategories.map( subCategory => Object.assign({}, {name: subCategory.name, id: subCategory._id}))
        res.status(200).send(data);
    }catch (err){
        res.status(400).send({
            message: 'Fetching subCategories failed'
        })
    }
};

module.exports = {
    newSubCategory,
    getAllSubCategories,
};
