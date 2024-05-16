import React, { useState, useEffect } from 'react';
import { Card,Row, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const getBackgroundColorClass = (item) => {
    switch (item) {
      case 'Users':
        return 'bg-primary';
      case 'Books':
        return 'bg-info';
      case 'Transactions':
        return 'bg-danger';
      default:
        return 'bg-danger';
    }
  };
  

const DashboardItems = ({ item }) => {
  return (
    <Card className={`shadow border-0 p-0 mx-0 ${getBackgroundColorClass(item.item)}`}>
        <Link to={item.link} className="text-decoration-none">
      <Card.Body className="d-flex justify-content-between align-items-center py-0">
        
            <div className="border-end pe-3 py-3">
                <span className="text-white" style={{fontSize: "50px"}}>
                {item.icon}
                </span>
            </div> 
            <div>
                <span className='text-white' style={{fontSize: "24px"}} >
                {item.item}
                </span>
            </div>
      
      </Card.Body>
      </Link>
    </Card>
  );
};

export default DashboardItems;
