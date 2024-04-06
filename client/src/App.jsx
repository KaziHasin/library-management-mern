import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomRouter } from './routes/CustomRouter';

const App = () => {
  return (
    <>
      <ToastContainer />
      <CustomRouter />
    </>
  )
}

export default App