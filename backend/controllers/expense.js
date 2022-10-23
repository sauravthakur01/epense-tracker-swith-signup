const Expense = require('../models/expense');
const User = require('../models/user')

exports.postExpense  =  async (req,res,next)=>{
    const {amount, description, category} = req.body ;
    try {
        if(!amount || !description || !category){
            return res.status(400).json({message:'add all fields'})
        }
        const data = await req.user.createExpense({amount, description, category})
        res.status(201).json({data ,  message:'sucessfully added expense'})
    } catch (error) {
        res.status(500).json({message:'unable to add expwnse'})
    }
}

exports.getExpenses = async(req,res,next)=>{
    try {
        let data = await req.user.getExpenses()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:'unable to get expwnse'})
    }
    
}

exports.deleteExpense = async(req,res,next)=>{
    try {
        const expenseId = req.params.expenseid ;
        await req.user.getExpenses({where:{id:expenseId}})
        .then(expense=>{
            let foundExpense = expense[0] ;
            foundExpense.destroy();
            res.status(200).json({message:'deleted sucessfully'})
        })
        
    } catch (error) {
        res.status(500).json({message:'unable to delete expwnse'})
    }
}

exports.getAllUserExpenses = async(req,res,next)=>{
    try {

        if(req.user.ispremiumuser){
            let leaderboard = [];
            let users = await User.findAll({attributes: ['id', 'name', 'email']})
    
            for(let i = 0 ;i<users.length ; i++){
                let expenses = await  users[i].getExpenses() ;
                let totalExpense = 0;
                for(let j = 0 ;j<expenses.length ; j++){
                    totalExpense += expenses[j].amount
                }
                let userObj = {
                    user:users[i],
                    expenses,
                    totalExpense
                }
                leaderboard.push(userObj);
            }
           return res.status(200).json({success : true, data : leaderboard});
        }

        return res.status(400).json({message : 'user is not premium user' });

    } catch (error) {
        res.status(500).json({success : false, data : error});
    }
}

exports.getLeaderboardUserExpense = async(req,res,next)=>{
    try {
        if(req.user.ispremiumuser){
            let userId = req.body.loadUserId;

            let user = await User.findOne({where:{id:userId}})
            const expenses = await user.getExpenses();
            
           return res.status(200).json({success:true , data: expenses })
        }
        return res.status(400).json({message : 'user is not premium user' });
    } catch (error) {
        res.status(500).json({success : false, data : error});
    }
}