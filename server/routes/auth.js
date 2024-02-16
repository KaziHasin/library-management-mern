const express = require("express");
const {
  adminLogin,
  adminLogout,
  userLogin,
  userLogout,
} = require("../controllers/AuthController");
const router = express.Router();

router.post("/admin", adminLogin);
router.post("/admin/logout", adminLogout);
router.post("/user/login", userLogin);
router.post("/user/logout", userLogout);

module.exports = router;
