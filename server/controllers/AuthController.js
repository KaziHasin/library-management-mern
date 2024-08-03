const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const generateUserToken = require("../utils/generateUserToken");
const path = require("path");
const multer = require("multer");
const { unlinkSync } = require("fs");

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

/** Admin profile
 * @api GET api/auth/admin/profile/:id
 */
const adminProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json({
    _id: user._id,
    username: user.username,
    name: user.name,
    email: user.email,
    userImage: user.userImage
  });
};


/** Update Admin profile
 * @api PUT api/auth/admin/profile/:id
 */
const updateAdminProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


/** Admin profile photo update
 * @api PUT api/auth/admin/profile/photo-update/:id
 */
const adminProfilePhotoUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    /* Using try-catch, it works and executes next line of code
     if the image deleted from the folder */
    if (user.userImage) {
      try {
        unlinkSync(`server/${user.userImage}`);
      } catch (unlinkError) {
        console.error("Error deleting image file:", unlinkError);

      }
    }

    // file uploads 
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'server/uploads/admin'); 
      },
      filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        cb(null, Date.now() + extension);
      }
    });

    const upload = multer({ storage }).single("image");

    upload(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "Failed to upload image" });
      }

      const profileImage = req.file
        ? req.file.path.replace(/\\/g, "/").replace(/^server\//, "")
        : "";

      user.userImage = profileImage;
      await user.save();

      res.json({ userImage: user.userImage });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
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

  const user = await User.findOne({ email, role: 'user' });

  if (user) {
    generateUserToken(res, user._id);

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
  res.clearCookie("userToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });

  res.status(200).json({ success: true, message: "Logout successful" });
};

module.exports = { adminLogin, adminProfile, updateAdminProfile, adminProfilePhotoUpdate, adminLogout, userLogin, userLogout };
