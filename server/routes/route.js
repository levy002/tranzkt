const routes = require('express').Router();
const categoriesController = require('../controllers/categoryController');
const subCategoriesController = require('../controllers/subCategoryController');
const transactionsController = require('../controllers/transactionController');

routes.route('/api/categories')
  .post(categoriesController.newCategory)
  .get(categoriesController.getAllCategories)
  .delete(categoriesController.deleteCategory);


  routes.route('/api/subCategories')
  .post(subCategoriesController.newSubCategory)
  .get(subCategoriesController.getAllSubCategories)
  .delete(subCategoriesController.deleteSubCategory);

  routes.route('/api/transactions')
  .post(transactionsController.newTransaction)
  .get(transactionsController.getAllTransactions)
  .delete(transactionsController.deleteTransaction)

  module.exports = routes;
