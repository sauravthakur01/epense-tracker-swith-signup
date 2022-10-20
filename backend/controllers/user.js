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