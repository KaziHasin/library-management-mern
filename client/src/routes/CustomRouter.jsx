import React from 'react'
import BookList from '../components/BookList';
import UserHeader from '../components/UserHeader';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TransactionHistory from '../components/TransactionHistory';
import Login from '../components/Login';
import AdminLogin from '../components/admin/AdminLogin';
import AdminLayout from '../components/admin/AdminLayout';
import NotFoundPage from '../components/NotFoundPage';
import FrontPrivateRoute from '../components/FrontPrivateRoute';
import BookDetails from '../components/BookDetails';
export const CustomRouter = () => {

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <UserHeader />
                            <BookList />
                        </>}
                />
                <Route
                    path="/book/:id"
                    element={
                        <>
                            <UserHeader />
                            <BookDetails />
                        </>}
                />
                <Route path='/' element={<FrontPrivateRoute />}>
                    <Route path="/transaction-history" element={<><UserHeader /> <TransactionHistory /></>} />
                </Route>

                <Route path='/login' element={<><UserHeader /><Login /></>}
                />
                <Route path='/admin' element={<AdminLogin />}
                />
                <Route path='/dashboard/*' element={<AdminLayout />}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    )
}
