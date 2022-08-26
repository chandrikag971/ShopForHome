const WhishlistData = require("../models/whishlist.model")



const addItemtoWhishlist = async (req, res) => {
    try {
        const newProduct = new WhishlistData(req.body);
        const addedProduct = await newProduct.save();
        res.send(addedProduct)
        
    } catch (error) {
        console.log(error)
    }
};

// const findAllProduct = async (req, res) => {
//     const allProduct = await WhishlistData.find();
//     res.send(allProduct);
// };

const findByUsername = async (req, res) => {
    const username = req.params.username
    const allProduct = await WhishlistData.find({ username });
    res.send(allProduct);
}


const updateItem = async (req, res) => {
    const _id = req.params._id
    const updatedProduct = await WhishlistData.findOneAndUpdate({ _id }, req.body, { new: true })
    res.send(updatedProduct);
}

const deleteItem= async (req, res) => {
    const _id = req.params._id
    const deletedProduct = await WhishlistData.findOneAndDelete({ _id });
    res.send(deletedProduct);
}
const exportObject = {
    addItemtoWhishlist,
findByUsername,
updateItem,
deleteItem,
}



module.exports = exportObject;



