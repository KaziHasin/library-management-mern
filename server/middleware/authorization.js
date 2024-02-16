const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Login required..." });
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET_TOKEN);
    req.userId = decode.userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid credentials" });
  }
};

module.exports = authorization;
