const User = require('../models/user')

exports.postSignup = async(req ,res,next)=>{

    try {
        const {name, email, password} = req.body ;

        if(!name || !email || !password){
            return res.status(400).json({message:'add all fields'})
        }

        const user = await User.findAll({where:{email}});
        if(user.length>0){
            return res.status(409).json({message:'user already exist'})
        }
        await User.create({ name , email ,password})
        return res.status(201).json({message:'successfully created new user'})
    
    } catch (err) {
        res.status(500).json(err);
    }
    
}

exports.postLogin = async(req,res,next)=>{
    try {
        
        const {email , password} = req.body ;
        
        if(!email || !password){
            return res.status(400).json({message:'enter all fields'})
        }

        const user = await User.findAll({where:{email}})
        
        if(user.length === 0){
            return res.status(404).json({message:'user not found'})
        }
        const foundUser = user[0];
        if(foundUser.password !== password){
            return res.status(404).json({message:'invalid password'})
        }
        return res.status(200).json(user)

    } catch (err) {
        return res.status(500).json(err)
    }
}