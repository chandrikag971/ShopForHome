const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserData = require("../../user-crud/models/users.model");

const createUser = async (req, res) => {
    try {
        const savedUser = await UserData.findOne({ email:req.body.email });
        if(savedUser)
            return res.send({"status":"Fail","message":"User Already Exists"})
        if (req.body.confirmPassword === req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10)
            const token = jwt.sign({ username: req.body.username, email: req.body.email }, "qwertyuiopasdfghjklzxcvbnmqwertyui")
            const tokenArr = []
            tokenArr.push({ token: token })
            req.body.tokens = tokenArr
            const newUser = new UserData(req.body);
            const addedUser = await newUser.save();
            res.send({status:"Success",message:addedUser})
        } else {
            res.send({ status:"Fail",message: "Passwords do not match" })
        }
    } catch (error) {
        res.send({status:"Fail",message:error})
    }

};

const loginUser = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const savedUser = await UserData.findOne({ email })
        if (savedUser) {
            const verifyPassword = await bcrypt.compare(password, savedUser.password)
            if (verifyPassword) {
                const token = jwt.sign({ username: savedUser.username, role: savedUser.role }, "qwertyuiopasdfghjklzxcvbnmqwertyui")

                // valid for 2 hours
                res.cookie("jwt", token, { expires: new Date(Date.now() + 7200000), secure: false })
                const userLoginData= {
                    username: savedUser.username,
                    first_name: savedUser.first_name,
                    last_name: savedUser.last_name,
                    email: savedUser.email,
                    phone: savedUser.phone,
                    role: savedUser.role,
                    loginStatus: true,
                    token: token
                }
                res.send({status:"Success",message:"Logged In Succesfully",data:userLoginData})
            }
            else {
                res.send({status:"Fail",message:"Incorrect Password"})
            }
        }
        else {
            res.send({status:"Fail",message:"User Not Found"})
        }
    } catch (error) {
        res.send({status:"Fail",message:"Internal Server Error"})
    }
};


const logoutUser = (req, res) => {
    res.clearCookie('jwt')
    res.json({ message: "user logout successfully", username: req.body.username });
}


const exportObject = {
    createUser,
    loginUser,
    logoutUser
}


module.exports = exportObject;
