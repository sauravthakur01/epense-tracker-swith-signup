const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expense');

router.post('/add-expense', expenseController.postExpense );

router.get('/' , expenseController.getExpenses)

router.delete('/delete-expense/:expenseid', expenseController.deleteExpense )

module.exports = router ;