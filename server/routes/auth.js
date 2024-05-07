const express = require("express");
const authorization = require('../middleware/authorization');
const {
  adminLogin,
  adminProfile,
  updateAdminProfile,
  adminProfilePhotoUpdate,
  adminLogout,
  userLogin,
  userLogout,
} = require("../controllers/AuthController");
const router = express.Router();

router.post("/admin", adminLogin);
router.get("/admin/profile/:id", authorization, adminProfile);
router.put("/admin/profile/:id", authorization, updateAdminProfile);
router.put("/admin/profile/photo-update/:id", authorization, adminProfilePhotoUpdate);
router.post("/admin/logout", adminLogout);
router.post("/user/login", userLogin);
router.post("/user/login", userLogin);
router.post("/user/logout", userLogout);

module.exports = router;
