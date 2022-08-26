const express = require("express");
const cors= require('cors')
const connectToMongo = require("../user-crud/config/db");
const { createUser,loginUser,logoutUser, getUserByToken} = require("./controllers/auth.controllers");
const {authenticateUser, authenticateAdmin} = require("./middleware/auth");
const cookieParser = require("cookie-parser");
connectToMongo()

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','http://localhost:3000' )
    res.header('Access-Control-Allow-Credentials',true )
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
})
app.use("/register", cors())
port = 8080;


// (req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','*' )
//     next();
// },

app.post("/register",createUser);
app.post("/login",loginUser)
app.post("/logout",authenticateUser, logoutUser)
// app.get("/token", getUserByToken)




app.listen(port,()=>{
    console.log(`Authorization service is listening on port ${port} `)
})