const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  
    username: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default:1
    },
    stock: {
        type: Number,
        default: 25
    },
    price: {
        type: Number,
        required:true
    }


})

const CartData = mongoose.model("CartData", cartSchema)
module.exports = CartData;