const mongoose = require('mongoose')

const userData = new mongoose.Schema({
    avatar:{
        type:String,
        required:true
    },
    username:{
        type:String,
        require:true,
        unique: true
    },
    email:{
        type:String,
        unique:true,
        require: true
    },
    password:{
        type:String,
        require:true
    },
    code:{
        type:String,
        required:true
    },
    email_verified:{
        type:Boolean,
        required:false
    },
    email_verified_at:{
        type:Date,
        required:false
    }
    
})

module.exports = mongoose.model('user', userData)