import React from 'react'
import { Card, Container } from 'react-bootstrap';
import Heading from '../../../layout/Heading';
import BookForm from './components/BookForm';

const BookAdd = () => {
  return (
    <>
 <Container fluid>
      <Heading heading="Users" breadcrumb={<span>Dashboard <span className='fs-4'>&#8250;</span> Users <span className='fs-4'>&#8250;</span> Add</span>} />
      
          <Card className="shadow-sm border-0 pt-4 pb-2 px-3">
            <BookForm/>
          </Card>
       
      </Container>

    </>
  )
}

export default BookAdd;
