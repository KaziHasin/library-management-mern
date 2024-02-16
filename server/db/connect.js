const mongoose = require("mongoose");

const connectDB = (connectionString) => {
  mongoose
    .connect(connectionString)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log(error));
};

module.exports = connectDB;
