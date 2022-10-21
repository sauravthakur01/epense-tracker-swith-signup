const Expense = require('../models/expense');

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