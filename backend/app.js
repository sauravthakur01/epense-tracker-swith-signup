const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');

const userRouter = require('./routes/user');
app.use(express.json())

app.use(cors());

app.use(bodyParser.json({extended:false}))

app.use('/user' , userRouter )

sequelize.sync()
.then(()=>{
    app.listen(3000 ,()=>{
        console.log('running');
    })
})
.catch(err=>{
    console.log(err)
})
    

