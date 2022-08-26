const CouponsData = require("../models/coupons.model")


const addCoupon = async (req, res) => {
    try {
        const newCoupon = new CouponsData(req.body);
        const addedCoupon = await newCoupon.save();
        res.send({status:"Success",message:addedCoupon})
    } catch (error) {
        res.status(500).send({ status: "Fail", message: err });
    }
};

const findAllCoupons = async (req, res) => {
    try{
        const allCoupons = await CouponsData.find();
        res.status(200).send({"status":"Success","message":allCoupons});
    }catch(err){
        res.status(500).send({ status: "Fail", message: err });
    }
};

const findCoupon = async (req, res) => {
    const code = req.params.code
    const allProduct = await CouponsData.findOne({ code });
    res.json(allProduct);
}


const updateCoupon = async (req, res) => {
    const code = req.params.code
    try{
        const updatedProduct = await CouponsData.findOneAndUpdate({ code }, req.body, { new: true })
        res.status(200).send({"status":"Success","message":updatedProduct});
    }catch(err){
        res.status(500).send({ status: "Fail", message: err });
    }
}

const deleteCoupon= async (req, res) => {
    const code = req.params.code
    try{
        const deletedProduct = await CouponsData.findOneAndDelete({ code });
        res.status(200).send({"status":"Success","message":deletedProduct});
    } catch(err) {
        res.status(500).send({"status":"Fail",'message':err})
    }
}

const exportObject = {
    addCoupon,
    findCoupon,
    updateCoupon,
    deleteCoupon,
    findAllCoupons
}



module.exports = exportObject;



