const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const authenticateUser = (req, res, next) => {
  try {
    // const token = req.headers.token
    const token = req.cookies.jwt
    // const token = "res.cookies.jwt"
    // const verifiedToken = jwt.verify(token,"qwertyuiopasdfghjklzxcvbnmqwertyui")
    jwt.verify(token, "qwertyuiopasdfghjklzxcvbnmqwertyui", (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.body.username = decoded.username;
      next();
    });

    // console.log(token)
    // // res.send("ab to dikha")
    // next()


  }

  catch (error) {
    console.log(error)
  }
}

  module.exports = authenticateUser;