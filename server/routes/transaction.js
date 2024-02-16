const express = require("express");
const router = express.Router();
const {
  getAllTransactions,
  addTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/TransactionController");

router.route("/").get(getAllTransactions).post(addTransaction);
router
  .route("/:id")
  .get(getTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
