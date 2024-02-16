const Book = require("../models/Book");
const { createCustomError } = require("../errors/customError");

/**
 * get all the books
 * @api GET api/books
 * */
const allBooks = async (req, res) => {
  const books = await Book.find();
  res.send(books);
};

/***
 * add a book into the resource
 * @api POST api/books
 */
const addBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      message: "New book created successfully",
      book,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/***
 * get a book from the resource
 * @api GET api/books/:id
 */
const getBook = async (req, res, next) => {
  const { id } = req.params;
  const book = await Book.findOne({ _id: id });
  if (!book) {
    res.status(404).json({ message: "Book not found" });
  }
  res.status(200).json({ book });
};

/***
 * update a book into the resource
 * @api PUT api/books/:id
 */
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/***
 * delete a book in the resource
 * @api DELETE api/books/:id
 */
const deleteBook = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findOneAndDelete({ _id: id });
  if (!book) {
    res.status(404).json({ message: "Book not found" });
  }
  res.status(200).json({
    message: "Book deleted successfully",
    book,
  });
};

module.exports = {
  allBooks,
  addBook,
  getBook,
  updateBook,
  deleteBook,
};
