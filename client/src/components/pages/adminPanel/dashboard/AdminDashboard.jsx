import React, { useState } from 'react';
import { Row, Col, Breadcrumb, Card, Container } from 'react-bootstrap'
import { FaBook, FaUserAlt } from 'react-icons/fa';
import { GrTransaction } from "react-icons/gr";
import DashboardItems from './DashboardItems';
import Heading from '../../../layout/Heading';

const cardItem = [
  {
    id: 1,
    item: "Users",
    icon: <FaUserAlt />,
    link: "/dashboard/users"
  },
  {
    id: 2,
    item: "Books",
    icon: <FaBook />,
    link: "/dashboard/books"
  },
  {
    id: 3,
    item: "Transactions",
    icon: <GrTransaction />,
    link: "/dashboard/transactions"
  },
];

const AdminDashboard = () => {

  const [items, setItems] = useState(cardItem)
  return (

    <>
     <Container fluid>
     <Heading heading="Admin Dashboard" breadcrumb="Dashboard" />
      <Card className="shadow-sm border-0 pt-4 pb-2 px-3 py-3">
        <Row>
          {items.map((item) => (
            <Col key={item.id} className="mb-3" md={6} lg={4}>
              <DashboardItems item={item} />
            </Col>
          ))}
        </Row>

      </Card>
     </Container>
    </>

  );
};

export default AdminDashboard;
