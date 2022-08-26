const mongoose = require("mongoose");

const salesRecord = new mongoose.Schema({
  saleDay: {
    type: Date,
  },
  sold: {
    type: Number,
  },
  dayRevenue: {
    type: Number,
    default: 0,
  },
});

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: {
    type: Array,
  },
  stock: {
    type: Number,
    default: 25,
  },
  mail:{
    type:String,
    default:"Available"
  },
  sold: {
    type: Number,
    default: 0,
  },
  revenue: {
    type: Number,
    default: 0,
  },
  saleRecords: [salesRecord],
});

const ProductData = mongoose.model("ProductData", productSchema)
module.exports = ProductData;