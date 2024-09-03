const { Category, Book } = require("../models/Book");
const { createCustomError } = require("../errors/customError");
const { getPaginationParams } = require("../utils/utils");

/**
 * get all the books
 * @api GET api/books
 * */
const allBooks = async (req, res) => {
    try {
        // get the reusable pagination function from utils.
        const { perPage, skipped, searchTerm } = getPaginationParams(req);

        let query = {};

        if (searchTerm) {
            query.$or = [
                { name: { $regex: searchTerm, $options: "i" } },
                { author: { $regex: searchTerm, $options: "i" } },
            ];
        }

        const countBooks = await Book.countDocuments(query);
        const totalPages = Math.ceil(countBooks / perPage);
        const books = await Book.find(query)
            .sort({ _id: -1 })
            .skip(skipped)
            .limit(perPage)
            .populate("category");

        res.send({ books, totalPages, totalBooks: countBooks });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/***
 * add a book into the resource
 * @api POST api/books
 */
const addBook = async (req, res, next) => {
    try {
        const categoryId = await handleCategory(req.body);

        const book = await Book.create({
            ...req.body,
            category: categoryId,
        });
        res.status(201).json({
            status: "success",
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
    const book = await Book.findOne({ _id: id }).populate("category");
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
/** create category if the category id is not passed */
const handleCategory = async (bookData) => {
    let categoryId;
    if (bookData.category_id) {
        categoryId = bookData.category_id;
    } else {
        const existingCategory = await Category.findOne({
            name: bookData.category,
        });
        if (existingCategory) {
            categoryId = existingCategory._id;
        } else {
            const newCategory = await Category.create({
                name: bookData.category,
            });
            categoryId = newCategory._id;
        }
    }
    return categoryId;
};
module.exports = {
    allBooks,
    addBook,
    getBook,
    updateBook,
    deleteBook,
};
