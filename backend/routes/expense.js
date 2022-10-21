const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expense');
const middleware = require('../middleware/auth');

router.post('/add-expense' , middleware.authentication, expenseController.postExpense );

router.get('/' , middleware.authentication,  expenseController.getExpenses)

router.delete('/delete-expense/:expenseid', middleware.authentication, expenseController.deleteExpense )

module.exports = router ;