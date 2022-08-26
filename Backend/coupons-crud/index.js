const {addCoupon,findCoupon,updateCoupon,deleteCoupon,findAllCoupons} = require("./controller/coupons.controller") 
const express = require("express");
const cors = require("cors")
const connectToMongo = require("./config/db");
const { authenticateAdmin, authenticateUser } = require("../authentication/middleware/auth");



const app = express();
port = 8085;
connectToMongo();
app.use(express.json())
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Credentials',true )
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
})
app.use(cors())

app.post('/add', authenticateAdmin, addCoupon)
app.get('/code/:code', authenticateUser, findCoupon)
app.get("/read-all", authenticateUser, findAllCoupons);
app.get("/read-all", authenticateAdmin, findAllCoupons);
app.put('/update/:code', authenticateAdmin, updateCoupon)
app.delete('/delete/:code', authenticateAdmin, deleteCoupon)


// listening the port
app.listen(port,()=>{
    console.log(`Server started on ${port}`)
})

    