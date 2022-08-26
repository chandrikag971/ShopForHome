const mongoose = require("mongoose");

const whishlistSchema = new mongoose.Schema({
  
    username: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true
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

const WhishlistData = mongoose.model("WhishlistData", whishlistSchema)
module.exports = WhishlistData;