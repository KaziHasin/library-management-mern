import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const UserHeader = () => {
  const location = useLocation();
  const isTransactionHistory = location.pathname === '/transaction-history';

  return (
    <Navbar expand="lg" className="bg-dark text-white" variant='dark'>
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-white">Library Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={isTransactionHistory ? '/' : '/transaction-history'} className="text-white">
              {isTransactionHistory ? 'Library Catalog' : 'Transaction History'}
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="text-white"><FaSignInAlt /> Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserHeader;
