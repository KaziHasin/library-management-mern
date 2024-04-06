import React from 'react'
import { Outlet } from 'react-router-dom'
import FrontHeader from './FrontHeader';
const FrontMasterLayout = () => {
    return (
        <>
            <FrontHeader />
            <Outlet />
        </>
    )
}

export default FrontMasterLayout