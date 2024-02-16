import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { FaUserAlt,FaBook } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";


const AdminSidebar = () => {
  return (
    <Nav className="flex-column ms-0 justify-content-start mt-5">
       <Nav.Link as={Link} to="/dashboard" className="text-white d-flex align-items-center my-2"><MdDashboard/> <span className="ms-2">Dashboard</span></Nav.Link>
       <Nav.Link as={Link} to="/dashboard/users" className="text-white d-flex align-items-center my-2"><FaUserAlt/> <span className="ms-2">Users</span></Nav.Link>
       <Nav.Link as={Link} to="/dashboard/books" className="text-white d-flex align-items-center my-2"><FaBook/> <span className="ms-2">Books</span></Nav.Link>
       <Nav.Link as={Link} to="/dashboard/transactions" className="text-white d-flex align-items-center my-2"><GrTransaction/> <span className="ms-2">Transactions</span></Nav.Link>
    </Nav>
  );
};

export default AdminSidebar;
