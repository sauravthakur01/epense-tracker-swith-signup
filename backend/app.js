const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');

const User = require('./models/user');
const Expense = require('./models/expense');
const Order =require('./models/order');
const Forgotpassword = require('./models/forgotpassword');
const Downloadurl = require('./models/downloadurls');

const userRouter = require('./routes/user');
const expenseRouter =require('./routes/expense');
const purchaseRouter = require('./routes/purchase')
const forgetpassRouter = require('./routes/forgetpass')

app.use(express.json())

app.use(cors());

app.use(bodyParser.json({extended:false}))

app.use('/user' , userRouter )
app.use('/expense' , expenseRouter )
app.use('/payment' , purchaseRouter)
app.use('/password' , forgetpassRouter)

Expense.belongsTo(User);
User.hasMany(Expense);

User.hasMany(Order);
Order.belongsTo(User);

Forgotpassword.belongsTo(User);
User.hasMany(Forgotpassword);

Downloadurl.belongsTo(User);
User.hasMany(Downloadurl);

sequelize.sync()
.then(()=>{
    app.listen(3000 ,()=>{
        console.log('running');
    })
})
.catch(err=>{
    console.log(err)
})
    

