const express = require("express");
const cors = require("cors");
const app = express();
const books = require("./routes/books");
const users = require("./routes/users");
const auth = require("./routes/auth");
const transaction = require("./routes/transaction");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const port = process.env.PORT || 4000;
const connectionString = process.env.MONGO_URI;
const connectDB = require("./db/connect");
const notFound = require("./middleware/notFound");
const errorHandling = require("./middleware/errorHandling");
const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(errorHandling);

// routes
app.get("/", (req, res) => {
  res.send("library management project");
});
app.use("/api/books", books);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/transactions", transaction);

app.use(notFound);

const startServer = async () => {
  try {
    await connectDB(connectionString);
    app.listen(port, () => {
      console.log("The app listen port ", port);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
