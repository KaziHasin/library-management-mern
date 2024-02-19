const Transaction = require("../models/Transaction");

/**
 * get all the transactions
 * @api GET api/transactions
 * */
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ _id: -1 })
      .populate("user")
      .populate("book");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


/**
 * get all login user's the transactions
 * @api GET api/transactions/user-transaction
 * */
const getUserTransactions = async (req, res) => {
  try {
    const userId = req.userId;
    const transactions = await Transaction.find({ user: userId }).sort({ _id: -1 })
      .populate('book');
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * add a transaction to the resources
 * @api POST api/transactions
 * */
const addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res
      .status(201)
      .json({ message: "New transaction created successfully", transaction });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * get a transaction from the resources
 * @api GET api/transactions/:id
 * */
const getTransaction = async (req, res) => {
  const { id } = req.params;
  const transaction = await Transaction.findOne({ _id: id })
    .populate("user")
    .populate("book");
  if (!transaction) {
    res.status(404).json({ message: "Transaction not found" });
  }
  res.status(200).json({ transaction });
};

/***
 * update a transaction into the resource
 * @api PUT api/transactions/:id
 */
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({
      message: "Transaction updated successfully",
      transaction,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/***
 * delete a transaction from the resource
 * @api DELETE api/transactions/:id
 */
const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  const transaction = await Transaction.findOneAndDelete({ _id: id });
  if (!transaction) {
    res.status(404).json({ message: "Transaction not found" });
  }
  res.status(200).json({
    message: "Transaction deleted successfully",
    transaction,
  });
};

module.exports = {
  getAllTransactions,
  getUserTransactions,
  addTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
