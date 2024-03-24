import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useUserLogoutMutation } from '../slices/api/userAuthApiSlice';
import { setUserLogout } from '../slices/userAuthSlice';
import { toast } from 'react-toastify';

const UserHeader = () => {
  const { userInfo } = useSelector((state) => state.userAuth);
  const location = useLocation();
  const isTransactionHistory = location.pathname === '/transaction-history';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userLogout, { isLoading }] = useUserLogoutMutation();
  const logoutHandler = async () => {

    try {
      await userLogout();
      dispatch(setUserLogout());
      navigate('/login');
    } catch (error) {
      toast.error(error?.data || error.error);
    }


  }
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
            {userInfo ? (
              <Nav.Link onClick={logoutHandler} className="text-white">
                <FaSignOutAlt /> Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="text-white">
                <FaSignInAlt /> Login
              </Nav.Link>

            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserHeader;
