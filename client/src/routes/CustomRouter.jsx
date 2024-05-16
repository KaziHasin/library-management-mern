import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BookList from '../components/pages/front/BookList';
import TransactionHistory from '../components/pages/front/TransactionHistory';
import Login from '../components/pages/front/Login';
import AdminLogin from '../components/pages/adminPanel/admin/AdminLogin';
import AdminLayout from '../components/layout/AdminLayout';
import NotFoundPage from '../components/pages/NotFoundPage';
import FrontPrivateRoute from '../components/privates/FrontPrivateRoute';
import BookDetails from '../components/pages/front/BookDetails';
import FrontMasterLayout from '../components/layout/FrontMasterLayout';
export const CustomRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<FrontMasterLayout />}>
                    <Route path="/" element={<BookList />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                    <Route path='/' element={<FrontPrivateRoute />}>
                        <Route path="/transaction-history" element={<TransactionHistory />} />
                    </Route>
                    <Route path='/login' element={<Login />} />
                </Route>

                <Route path='/admin' element={<AdminLogin />}
                />
                <Route path='/dashboard/*' element={<AdminLayout />}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    )
}
