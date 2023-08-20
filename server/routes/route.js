const routes = require('express').Router();
const categoriesController = require('../controllers/categoryController');
const subCategoriesController = require('../controllers/subCategoryController');
const transactionsController = require('../controllers/transactionController');
const budgetController = require('../controllers/budgetConteroller');

routes.route('/api/categories')
  .post(categoriesController.newCategory)
  .get(categoriesController.getAllCategories)


  routes.route('/api/subCategories')
  .post(subCategoriesController.newSubCategory)
  .get(subCategoriesController.getAllSubCategories)

  routes.route('/api/transactions')
  .post(transactionsController.newTransaction)
  .get(transactionsController.getAllTransactions)


  routes.route('/api/transactions/:id')
  .delete(transactionsController.deleteTransaction)

  routes.route('/api/budget')
  .post(budgetController.newBudget)
  .get(budgetController.getBudget)

  routes.route('/api/budget/:id')
  .put(budgetController.updateBudget);

  module.exports = routes;
