const jwt = require("jsonwebtoken")

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.token
    jwt.verify(token, "qwertyuiopasdfghjklzxcvbnmqwertyui", (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.body.username = decoded.username;
      next();
    });
  } catch (error) {
    console.log(error)
  }
}
const authenticateAdmin = (req, res, next) => {
  try {
    const token = req.headers.token
    jwt.verify(token, "qwertyuiopasdfghjklzxcvbnmqwertyui", (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      if (decoded.role === "admin") {
        req.body.username = decoded.username;
        next();
      }
      else {
        res.json({ message: "only for admin" })
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const exportObject = {authenticateUser, authenticateAdmin}

module.exports = exportObject;