import React, { useState, useEffect } from 'react';
import { Card, Row, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Book = ({ book }) => {
  return (
    <Link to={`book/${book._id}`} className='text-decoration-none'>
      <Card className="shadow border-0 p-0 mx-0">

        <Card.Img variant="top" src="images/closed-book.png" style={{ width: "100%", height: "300px" }} />
        <Card.Body className="mt-2">
          <Card.Title className="text-center d-flex justify-content-between">
            {book.name}
            <Badge bg={`${book.currentAvailability ? 'success' : 'danger'}`} className="pb-2">{book.currentAvailability ? "Available" : "Not Available"}</Badge>
          </Card.Title>


        </Card.Body>
      </Card>
    </Link >
  );
};

export default Book;
