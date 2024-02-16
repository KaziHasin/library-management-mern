import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col} from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from './dashboard/AdminDashboard';
import UsersList from './users/UsersList';
import UserAdd from './users/UserAdd';
import UserEdit from './users/UserEdit';
import PrivateRoutes from './PrivateRoutes';


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
      <AdminHeader handleSidebar={handleSidebar}/>
      <Container fluid>
        <Row>
          <Col sm={10} md={2} className={`bg-primary ${openSidebar ? '' :'d-none' } d-md-block`} style={{minHeight:"100vh"}}>
            <AdminSidebar /> 
          </Col>
          <Col md={10} className={`p-4 ${openSidebar && 'd-none'}`} style={{backgroundColor: '#F5F7FB'}}>
            <Routes>
              <Route element={<PrivateRoutes/>}>
                <Route path="/" element={<AdminDashboard/>}/>
                <Route path="/users" element={<UsersList/>}/>
                <Route path="/users/add" element={<UserAdd/>}/>
                <Route path="/users/edit/:id" element={<UserEdit/>}/>
              </Route>
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLayout;
