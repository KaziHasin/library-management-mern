import React, { useState, useEffect } from 'react';
import { Card,Row, Badge } from 'react-bootstrap';
import { FaBook } from "react-icons/fa";


const Book = ({ book }) => {
  return (
    <Card className="shadow border-0 p-0 mx-0">
      <Card.Img variant="top" src="images/closed-book.png" style={{width: "100%", height: "300px"}}/>
      <Card.Body className="mt-2">
        <Card.Title className="text-center">{book.title}</Card.Title>
        <div className='d-flex justify-content-between align-items-center mb-2'>
        <h6 className="text-muted">{book.author}</h6>
        <Badge bg={`${book.currentAvailability ? 'success' : 'danger'}`} className="pb-2">{book.currentAvailability ? "Available" : "Not Available"}</Badge>
        </div>
       
      </Card.Body>
    </Card>
  );
};

export default Book;
