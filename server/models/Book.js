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
  category: { type: String, default: "un_category" },
  currentAvailability: { type: Boolean, default: true },
  stocks: {
    type: Number,
    required: [true, 'Number of stocks is required']
  }
});

module.exports = mongoose.model("Book", bookSchema);
