import React, { useState, useEffect } from 'react'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CustomRouter } from './routes/CustomRouter';


const App = () => {
  const [books, setBooks] = useState([])
  const [transactions, setTransactions] = useState([])

  const bookList = [
    {
      id: 1,
      title: "Test",
      author: "Kazi Hasin",
      currentAvailability: true,
    },
    {
      id: 2,
      title: "Test 2",
      author: "Rohan Das",
      currentAvailability: false
    },
    {
      id: 3,
      title: "Test 3",
      author: "Kololl Das",
      currentAvailability: true
    },
  ];

  const transactionList = [
    {
      id: 1,
      book: {
        name: "Test",
      },
      dueDate: "2023-12-20",
      transactionType: "borrow",
    },
    {
      id: 2,
      book: {
        name: "Test 2",
      },
      dueDate: "2023-12-05",
      transactionType: "borrow",
    },
    {
      id: 3,
      book: {
        name: "Test 3",
      },
      dueDate: "2023-12-22",
      transactionType: "returned",
    },
  ];

  useEffect(() => {
    setBooks(bookList)
    setTransactions(transactionList)

  }, [])


  return (
    <>
      <ToastContainer />
      <CustomRouter books={books} transactions={transactions} />
    </>
  )
}

export default App