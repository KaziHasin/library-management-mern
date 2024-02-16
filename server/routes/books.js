const express = require("express");
const router = express.Router();
const {
  allBooks,
  addBook,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/BookController");

router.route("/").get(allBooks);
router.route("/").post(addBook);
router.route("/:id").get(getBook);
router.route("/:id").put(updateBook);
router.route("/:id").delete(deleteBook);

module.exports = router;
