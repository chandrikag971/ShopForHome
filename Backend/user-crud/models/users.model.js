const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type: Date
    }
})

const UserData= mongoose.model("UserData",userSchema)
module.exports=UserData;
