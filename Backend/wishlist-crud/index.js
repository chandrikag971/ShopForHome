const {addItemtoWhishlist,findByUsername,updateItem,deleteItem,} = require("./controller/whishlist.controller") 
const express = require("express");
const cors = require("cors")
const connectToMongo = require("./config/db");
const { authenticateUser } = require("../authentication/middleware/auth");




const app = express();
port = 8084;
connectToMongo();
app.use(express.json());
// app.use(express.static( "public"))
app.use(cors())
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Credentials',true )
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
})
app.use(authenticateUser)
app.post('/add-item',addItemtoWhishlist)
app.get('/username/:username',findByUsername)
app.put('/update/:_id',updateItem)
app.delete('/delete/:_id',deleteItem)


// listening the port
app.listen(port,()=>{
    console.log(`Server started on ${port}`)
})

    