const express = require("express");
const router = express.Router();
const authorization = require('../middleware/authorization');
const userAuthorization = require("../middleware/userAuthorization");
const {
  getAllTransactions,
  getUserTransactions,
  addTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/TransactionController");


router.route("/").get(authorization, getAllTransactions).post(authorization, addTransaction);
router.get('/user-transaction', userAuthorization, getUserTransactions);
router
  .route("/:id")
  .get(getTransaction)
  .put(authorization, updateTransaction)
  .delete(authorization, deleteTransaction);


module.exports = router;
