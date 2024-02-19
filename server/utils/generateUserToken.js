const jwt = require('jsonwebtoken');

const generateUserToken = (res, userId) => {

    const userToken = jwt.sign({ userId }, process.env.SECRET_TOKEN, { expiresIn: '30d' });

    res.cookie('userToken', userToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    })
}

module.exports = generateUserToken;