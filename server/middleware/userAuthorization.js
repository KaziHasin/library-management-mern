const jwt = require('jsonwebtoken');

const userAuthorization = (req, res, next) => {

    const userToken = req.cookies.userToken;

    if (!userToken) {
        return res.status(401).json({ message: "User unauthorized." });
    }

    try {
        const decode = jwt.verify(userToken, process.env.SECRET_TOKEN);
        req.userId = decode.userId;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid user credential" });
    }


}


module.exports = userAuthorization;