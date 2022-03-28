const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res, next) => {
  try {
    const jwToken = req.header("token");
    if (!jwToken) {
      return res.status(403).json("Not authorized.");
    }

    const action = jwt.verify(jwToken, process.env.jwtSecret);
    req.user = action.user;
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not authorized.");
  }
  next();
};
