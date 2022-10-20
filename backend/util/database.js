const Sequelize = require('sequelize');

const sequelize = new Sequelize ('expense-tracker' ,'root', 'sp.191273',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize ;