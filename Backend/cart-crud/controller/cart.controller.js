const CartData = require("../models/cart.model")


const addItemtoCart = async (req, res) => {
    try {
        const newProduct = new CartData(req.body);
        const addedProduct = await newProduct.save();
        res.send(addedProduct)
    } catch (error) {
        console.log(error)
    }
};

// const findAllProduct = async (req, res) => {
//     const allProduct = await CartData.find();
//     res.send(allProduct);
// };

const findByUsername = async (req, res) => {
    const username = req.params.username
    const allProduct = await CartData.find({ username });
    res.send(allProduct);
}


const updateItem = async (req, res) => {
    const _id = req.params._id
    const updatedProduct = await CartData.findOneAndUpdate({ _id }, req.body, { new: true })
    res.send(updatedProduct);
}

const deleteItem= async (req, res) => {
    const _id = req.params._id
    const deletedProduct = await CartData.findOneAndDelete({ _id });
    res.send(deletedProduct);
}

const exportObject = {
    addItemtoCart,
    findByUsername,
    updateItem,
    deleteItem,
}



module.exports = exportObject;



