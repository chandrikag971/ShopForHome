const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/capstone-project"
const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('Connected to Mongo Database');
    })
}
module.exports=connectToMongo