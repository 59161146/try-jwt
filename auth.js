const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;

const auth = async (req, res, next) => {
  let token = req.header("Authorization");
  let decoded;

  try {
    decoded = await jwt.verify(token, jwtKey);
    req.decoded = decoded;
    next();
  } catch (err) {
    console.error(`Invalid token: ${err}`);
    res.status(401).json({ error: err });
  }
};

module.exports = auth;
