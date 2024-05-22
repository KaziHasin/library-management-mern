import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Book from './Book'
import { useDispatch, useSelector } from 'react-redux'
import { selectBooks, setBooks } from '../../../slices/booksSlice'
import { useGetBookListQuery } from '../../../slices/api/BooksApiSlice'
import Loader from '../../utils/Loader'


const BookList = () => {

  const books = useSelector((selectBooks));
  const dispatch = useDispatch();

  const { data: getBookListing, error, isLoading } = useGetBookListQuery();



  useEffect(() => {
    if (getBookListing) {
      dispatch(setBooks(getBookListing));
    }
  }, [getBookListing, dispatch]);



  return (
    <Container className="mt-3">
      <Row className="mb-3">
        <Col className="col-md-4">
          <h2 className="text-center">Library Catalogue</h2>
        </Col>
      </Row>
      <Row>
        {isLoading ? <Loader /> : <>
          {books.map((book) => (
            <Col key={book._id} className="mb-3" sm={6} md={4} lg={4}>
              <Book book={book} />
            </Col>
          ))}
        </>}

      </Row>
    </Container>
  )
}

export default BookList