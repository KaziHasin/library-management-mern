const User = require("../models/User");
const generateToken = require("../utils/generateToken");

/**
 * get all the users
 * @api GET api/users
 * */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * add a user to the resources
 * @api POST api/users
 * */
const addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    if (user.password) {
      generateToken(res, user._id);
    }
    res.status(201).json({
      status: "success",
      message: "New user created successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

/**
 * get a user from the resources
 * @api GET api/users/:id
 * */
const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }).select("-password");
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ user });
};

/***
 * update a user into the resource
 * @api PUT api/users/:id
 */
const updateUser = async (req, res) => {
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
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/***
 * delete a user from the resource
 * @api DELETE api/users/:id
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
    user,
  });
};

module.exports = { getAllUsers, addUser, getUser, updateUser, deleteUser };
