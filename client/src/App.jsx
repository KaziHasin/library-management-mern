import React, {useState, useEffect} from 'react'
import BookList from './components/BookList';
import UserHeader from './components/UserHeader';
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import TransactionHistory from './components/TransactionHistory';
import Login from './components/Login';
import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import NotFoundPage from './components/NotFoundPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    <Router>
      <ToastContainer />
    <Routes>
      <Route
        path="/"
        element={
        <>
        <UserHeader />
        <BookList books={books} />
        </>}
      />
      <Route
        path="/transaction-history"
        element={
        <><UserHeader/> <TransactionHistory transactions={transactions} /></>}
        
      />
      <Route path='/login' element={<><UserHeader/><Login/></>}
      />
      <Route path='/admin' element={<AdminLogin/>}
      />
      <Route path='/dashboard/*' element={<AdminLayout/>}
      />
       <Route path="*" element={<NotFoundPage/>} />
    </Routes>
  </Router>
  )
}

export default App