const mongoose = require("mongoose");

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
  currentAvailability: { type: Boolean, default: true },
});

module.exports = mongoose.model("Book", bookSchema);
