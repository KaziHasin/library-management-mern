import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const FrontPrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.userAuth);
    return (
        userInfo ? <Outlet /> : <Navigate to='/login' replace />

    )
}

export default FrontPrivateRoute