const express = require("express");
const router = express.Router();
const authorization = require("../middleware/authorization");
const {
  getAllUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.use(authorization);
router.route("/").get(getAllUsers).post(addUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
