import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { FaSignOutAlt, FaUserCircle, FaUserLock } from 'react-icons/fa';
import { IoIosMenu } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../slices/api/authApiSlice';
import { setLogout } from '../../slices/authSlice';
import { toast } from 'react-toastify';


const AdminHeader = ({ handleSidebar }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminInfo } = useSelector((state) => state.auth);
  const id = adminInfo._id;
  const [Logout] = useLogoutMutation();

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const res = await Logout().unwrap();
      console.log(res);
      dispatch(setLogout())
      navigate('/admin');
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout please try later....");
    }
  }
  return (
    <Navbar expand="lg" className="text-dark shadow-sm">
      <Container>
        <IoIosMenu className="d-block d-md-none fs-2" onClick={handleSidebar} />
        <Navbar.Brand as={Link} to="/" className="text-dark d-md-block">
          Library Management
        </Navbar.Brand>
        <Nav className='ms-auto d-flex align-items-center'>
          {adminInfo &&
            <>
              <FaUserCircle />
              <NavDropdown title={adminInfo.name} id='username'>
                <NavDropdown.Item as={Link} to={`/dashboard/profile/${id}`}><FaUserLock /> Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          }
        </Nav>
      </Container>

    </Navbar>
  );
};

export default AdminHeader;
