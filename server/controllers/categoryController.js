const model = require('../models/models');

const newCategory = async (req, res) => {
   const { name } = req.body;

  try{
    const category = await model.Category.create({ name });
    res.status(201).send({
        category: {
            name: category.name
        },
        message: "Category created Successfully"
    })
  }catch (err) {
    res.status(400).send({
        message: 'Creating category failed'
    })
  }
};


const getAllCategories = async (req, res) => {

    try{
        let categories = await model.Category.find({});
        let data = await categories.map( category => Object.assign({}, {name: category.name, id: category._id}))
        res.status(200).send(data);
    }catch (err){
        res.status(400).send({
            message: 'Fetching categories failed'
        })
    }
};

const deleteCategory = async (req, res) => {
    try{
        const { id } = req.body;
        await model.Category.findByIdAndDelete(id);
        res.status(200).send({
            message: 'Category deleted successfully'
        });
    } catch (err) {
        res.status(400).send({
            message: 'Deleting categories failed'
        })
    }
}

module.exports = {
    newCategory,
    getAllCategories,
    deleteCategory
};
