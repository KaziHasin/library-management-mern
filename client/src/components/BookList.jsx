import React, {useState, useEffect} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Book from './Book'


const BookList = ({books}) => {
  return (
     <Container className="mt-3">
        <Row className="mb-3">  
        <Col className="col-md-4">
              <h2 className="text-center">Library Catalog</h2>
            </Col>
        </Row>
         <Row>
        {books.map((book) => (
         <Col key={book.id} className="mb-3">      
               <Book book={book} />
          </Col>
        ))}
      </Row>
     </Container>
  )
}

export default BookList