import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BookList from '../components/front/BookList';
import TransactionHistory from '../components/front/TransactionHistory';
import Login from '../components/front/Login';
import AdminLogin from '../components/admin/AdminLogin';
import AdminLayout from '../components/layout/AdminLayout';
import NotFoundPage from '../components/NotFoundPage';
import FrontPrivateRoute from '../components/front/FrontPrivateRoute';
import BookDetails from '../components/front/BookDetails';
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
