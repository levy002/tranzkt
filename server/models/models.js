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
    month: { type: String, required: true}
});

const Category = mongoose.model('categories', categoryModel);
const SubCategory = mongoose.model('subCategories', subCategoryModel);
const Transaction = mongoose.model('transactions', transactionModel);

module.exports = {
    Category,
    SubCategory,
    Transaction
};
