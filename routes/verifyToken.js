const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(403).json("you are not authenticated");
  }
};

module.exports = { verifyToken };
