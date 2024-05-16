import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
  const { adminInfo } = useSelector((state) => state.auth);
  return (
    adminInfo ? <Outlet /> : <Navigate to='/admin' replace />
  )
}
export default PrivateRoutes