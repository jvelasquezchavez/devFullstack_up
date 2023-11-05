const webJwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const authenticationMiddleware = (req, res, next) => {
  const authToken = req.header("Authorization");
  if (!authToken) 
    return res.status(401).json({ message: "Iniciar sesión. Access Denied." });
  
  try {
    const newToken = webJwt.verify(authToken.replace("Bearer ", ""), secretKey);
    req.user = newToken.user;
    next();
  } catch (error) {
    res.status(401).send("Access Denied");
  }
};

module.exports = { authenticationMiddleware };