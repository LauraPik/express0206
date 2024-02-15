// pasiprasome mongoose

const mongoose = require('mongoose');
// npm i validator packige
const validator = require('validator');
// npm i bcrypt
const bcrypt = require('bcryptjs')

const userShema = new mongoose.Schema({
    name:{
        type: String,
        require:[true, "Please tell us your name."]
    },
    email:{
        type: String,
        // tikrina emailus
        required:[true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate:[validator.isEmail, 'Please provide your email'],
    },
    photo: String,
    password:{
        type:String,
        required:[true, 'Please provide a password'],
        minlenght:8,
        select:false
    },
    passwordConfirm:{
        type: String,
        required:[true, "Please confirm your password"],
        validate:{
            validator: function(el){
                return el == this.password
            },
            message: "Passwords are not the same"
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active:{
        type:Boolean,
        default: true,
        select: false
    }

})

// norime enkriptinti slaptazodi
userShema.pre('save', async function(next){
    // 
    if(!this.isModified('password')) return next();
   
    // hash password with cost 12
    this.password = await bcrypt.hash(this.password, 12);

    // istrinti kas buvo confirm_password
    this.passwordConfirm = undefined;

    next();


})


const User = mongoose.model('User', userShema);

module.exports = User