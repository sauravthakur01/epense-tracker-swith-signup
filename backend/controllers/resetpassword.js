const uuid = require('uuid');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Forgotpassword = require('../models/forgotpassword');
const { ForeignKeyConstraintError } = require('sequelize');

exports.forgotpassword = async(req,res,next)=>{
    try {
        const {email} =req.body ;
        const user = await User.findOne({where:{email}});

        if(!user){
             return res.status(404).json('User doesnt exist')
        }
        const id = uuid.v4();
        user.createForgotpassword({id , active:true})
        .catch(err => {
            throw new Error(err)
        })

        sgMail.setApiKey(process.env.SENDGRID_API_KEY)

        const msg = {
            to: email, // Change to your recipient
            from: 'test@example.com', // Change to your verified sender
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`
        }

        sgMail
        .send(msg)
        .then((response) => {
            return res.status(response[0].statusCode).json({message: 'Link to reset password sent to your mail ', sucess: true})
        })
        .catch((error) => {
            throw new Error(error);
        })

    } catch (error) {
        return res.json({ message: err, sucess: false });
    }
}

exports.resetpassword = async(req,res,next)=>{
    let  id = req.params.id ;

    try {
        let forgotpasswordrequest = await Forgotpassword.findOne({where:{id}})
        if(!forgotpasswordrequest){
            return res.status(404).json('User doesnt exist')
        }
        forgotpasswordrequest.update({ active:false });
        res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                )
            res.end();
    } catch (err) {
        return res.status(500).json({ message: err});
    }
}

exports.updatepassword = async(req,res,next)=>{
    const { newpassword } = req.query;
    const id = req.params.resetpasswordid;

    try {
        const resetpasswordrequest  = await Forgotpassword.findOne({where:{id}})
        const user = await User.findOne({where:{id:resetpasswordrequest.id }})
        if(!user){
            return res.status(404).json({ error: 'No user Exists', success: false})
        }

        const salt = 10 ;
        bcrypt.hash(newpassword , salt , async(err, hash)=>{
            if(err){
                throw new Error(err);
            }
            await user.update({ password:hash })
            res.status(201).json({message: 'Successfuly update the new password'})
        })

    } catch (error) {
        
    }
}