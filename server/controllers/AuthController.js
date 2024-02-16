const User = require("../models/User");
const generateToken = require("../utils/generateToken");

/**
 * admin login functionality
 * @api POST api/auth/admin
 * */
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401).json("Credential are not matched");
  }
};

/**
 * admin logout functionality
 * @api POST api/auth/admin/logout
 * */
const adminLogout = (req, res) => {
  res.clearCookie("jwtToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });

  res.status(200).json({ success: true, message: "Logout successful" });
};

/**
 * user login functionality
 * @api POST api/auth/user/login
 * */
const userLogin = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401).json("User not found");
  }
};

/**
 * user logout functionality
 * @api POST api/auth/user/logout
 * */
const userLogout = (req, res) => {
  res.clearCookie("jwtToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });

  res.status(200).json({ success: true, message: "Logout successful" });
};

module.exports = { adminLogin, adminLogout, userLogin, userLogout };
