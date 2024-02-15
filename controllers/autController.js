const User = require('.././models/userModels');
const jwt = require('jsonwebtoken')

exports.signup = async(req, res)=>{
    try{
        const newUser = await User.create(
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                passwordConfirm: req.body.passwordConfirm
            }
        );
        // pasiimame mongo _id
        const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
        // sukurtas 201 kodas 
        res.status(201).json({
            status: "success",
            data: newUser,
            token
        })

    }catch(err){
        res.status(404).json({
            status:"failed",
            message: err.message
        })

    }

}