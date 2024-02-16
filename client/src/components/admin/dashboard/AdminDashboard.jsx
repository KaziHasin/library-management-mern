import React, { useState } from 'react';
import { Row, Col, Breadcrumb} from 'react-bootstrap'
import { FaBook, FaUserAlt } from 'react-icons/fa';
import { GrTransaction } from "react-icons/gr";
import DashboardItems from './DashboardItems';

const cardItem = [
  {
    id: 1,
    item: "Users",
    icon: <FaUserAlt/>,
    link: "/dashboard/users"
  },
  {
    id: 2,
    item: "Books",
    icon: <FaBook/>,
    link: "/dashboard/books"
  },
  {
    id: 3,
    item: "Transactions",
    icon: <GrTransaction/>,
    link: "/dashboard/transactions"
  },
];

const AdminDashboard = () => {

  const [items, setItems] = useState(cardItem)
  return (
    
      <>
      <h4>Welcome to the Admin Dashboard</h4>
      <Breadcrumb>
      <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
        <Row className="m-md-5">
        {items.map((item) => (
         <Col key={item.id} className="mb-3" md={6} lg={4}>      
               <DashboardItems item={item} />
          </Col>
        ))}
      </Row>
       
    
     </>
  
  );
};

export default AdminDashboard;
