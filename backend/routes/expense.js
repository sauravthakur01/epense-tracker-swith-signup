const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expense');
const middleware = require('../middleware/auth');

router.post('/add-expense' , middleware.authentication, expenseController.postExpense );

router.get('/' , middleware.authentication,  expenseController.getExpenses)

router.delete('/delete-expense/:expenseid', middleware.authentication, expenseController.deleteExpense )

router.get('/premium-leaderboard' , middleware.authentication , expenseController.getAllUserExpenses )

router.post('/leaderboard-user' , middleware.authentication , expenseController.getLeaderboardUserExpense)

module.exports = router ;