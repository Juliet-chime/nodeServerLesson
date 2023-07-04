const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema({
    username:{
        type: String,
        required:true
    },
    roles:{
        user:{ 
            type:Number,
            default:2001
        },
        editor:Number,
        admin:Number
    },
    password:{
        type:String,
        required:true 
    },
    refreshToken:String
})

module.exports=mongoose.model('User', userSchema)