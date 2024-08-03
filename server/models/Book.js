const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, default: "un_category" }
});

const Category = mongoose.model("Category", categorySchema);

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Book name is required"],
    trim: true,
    minlength: [2, "Book name at least two character"],
  },
  author: {
    type: String,
    required: [true, "Author name is required"],
    trim: true,
    minlength: [3, "Author name at least two character"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Category,
    required: [true, "Category is required"]
  },
  currentAvailability: { type: Boolean, default: true },
  stocks: {
    type: Number,
    required: [true, 'Number of stocks is required']
  }
}, {
  timestamps: true,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = {Category, Book};
