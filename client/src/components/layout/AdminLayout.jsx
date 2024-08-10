import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSideBar';
import AdminDashboard from '../pages/adminPanel/dashboard/AdminDashboard';
import UsersList from '../pages/adminPanel/users/UsersList';
import BookList from '../pages/adminPanel/books/BookList';
import BookAdd from '../pages/adminPanel/books/BookAdd';
import UserAdd from '../pages/adminPanel/users/UserAdd';
import UserEdit from '../pages/adminPanel/users/UserEdit';
import PrivateRoutes from '../privates/AdminPanelPrivateRoutes';
import AdminProfile from '../pages/adminPanel/admin/AdminProfile';


const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false)

  useEffect(() => {
    setOpenSidebar(false)
  }, [])


  const handleSidebar = () => {
    setOpenSidebar(!openSidebar)
  }
  return (
    <>
      <AdminHeader handleSidebar={handleSidebar} />
      <Container fluid>
        <Row>
          <Col sm={10} md={2} className={`bg-primary ${openSidebar ? '' : 'd-none'} d-md-block`} style={{ minHeight: "100vh" }}>
            <AdminSidebar />
          </Col>
          <Col md={10} className={`p-4 ${openSidebar && 'd-none'}`} style={{ backgroundColor: '#F5F7FB' }}>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/profile/:id" element={<AdminProfile />} />
                <Route path="/users" element={<UsersList />} />
                <Route path="/users/add" element={<UserAdd />} />
                <Route path="/users/edit/:id" element={<UserEdit />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/books/add" element={<BookAdd />} />
              </Route>
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLayout;
