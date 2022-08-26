const ProductData = require("../models/products.model")
const fs = require("fs");
const ctj = require("convert-csv-to-json");
const path = require('path')


const createOneProduct = async (req, res) => {
    const newProduct = new ProductData(req.body);
    const addedProduct = await newProduct.save();
    res.send(addedProduct)
};


const bulkUpload = (req,res) => {
    if (!req.files) 
        return res.status(400).send("No files were uploaded.");

    let fileObj = req.files.file

    fs.open("productsData.csv", "w", function (err, file) {
      if (err) console.log("File Creation Error");
      fs.writeFile(file,fileObj.data,function(error){
        if(error) console.log('Error in Writing')

        let filePath = path.join(__dirname, "../../productsData.csv");

        let data = ctj.fieldDelimiter(',').parseSubArray('*',';').getJsonFromCsv(filePath);

        ProductData.insertMany(data).then(prods => {
            res.status(200).send("Products Added in Bulk")
        }).catch(e=>{
            res.status(500).send(e)
        })
    })})
}

const findAllProduct = async (req, res) => {
    const allProduct = await ProductData.find().sort({"stock":1});
    res.send(allProduct);
};

const findProductName = async (req, res) => {
    const tagName = req.params.tagName
    const allProduct = await ProductData.find({ tags: tagName });
    res.send(allProduct);
}
const findProductId = async (req, res) => {
    const id = req.params.id
    const allProduct = await ProductData.findOne({ _id: id });
    res.json(allProduct);
}

// Utility Function to convert Date into required Format
const convertDate = (d) => {
    return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
}


const updateProduct = async (req, res) => {
    const _id = req.params._id
    if(!req.body.purchasePrice)
    {
        const updatedProduct = await ProductData.findOneAndUpdate({_id:_id},req.body)
        return res.send({
          status: "Success",
          message: "Product Updated Succesfully",
          data: updatedProduct,
        });
    }

    const product = await ProductData.findById(_id);
    if(product){
        const today = new Date()
        const convtToday = convertDate(today);
        const record = product.saleRecords.find((x) => convertDate(x.saleDay) === convtToday)
        if(record){
            record.sold += req.body.quantity
            record.dayRevenue += req.body.purchasePrice
        } else {
            product.saleRecords.push({
              saleDay: today,
              sold: req.body.quantity,
              dayRevenue: req.body.purchasePrice,
            });
        }
        product.sold = req.body.sold
        product.stock = req.body.stock
        product.mail = req.body.mail
        product.revenue += req.body.purchasePrice

        let updatedProduct = await product.save();
        res.send({status:"Success",message:"Product Updated Succesfully",data:updatedProduct})
    } else {
        res.send({status:"Fail",message:"Product Not Found"})
    }
}


const deleteProduct = async (req, res) => {
    const _id = req.params._id
    const deletedProduct = await ProductData.findOneAndDelete({ _id });
    res.send(deletedProduct);
}
const exportObject = {
    createOneProduct,
    findProductName,
    findAllProduct,
    updateProduct,
    deleteProduct,
    bulkUpload,
    findProductId
}



module.exports = exportObject;



