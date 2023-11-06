const mongoose = require('mongoose')

const calculation = new mongoose.Schema({
    
    id_calculation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    calculation:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    hours:{
        type:String,
        required:true
    }
    
})

module.exports = mongoose.model('calculation', calculation)