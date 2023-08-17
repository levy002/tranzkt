const mongoose = require('mongoose');

const categoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const subCategoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const transactionModel = new mongoose.Schema({
    name: {type: String, required: true},
    type: { type: String, required: true},
    category: { type: String },
    subCategory: { type: String },
    amount: {type: Number, required: true},
    time: { type: String, required: true}
});

const budgetModel = new mongoose.Schema({
    amount: {
        type: Number,
        default: 0
    }
});

const Category = mongoose.model('categories', categoryModel);
const SubCategory = mongoose.model('subCategories', subCategoryModel);
const Transaction = mongoose.model('transactions', transactionModel);
const Budget = mongoose.model('budget', budgetModel);

module.exports = {
    Category,
    SubCategory,
    Transaction,
    Budget
};
