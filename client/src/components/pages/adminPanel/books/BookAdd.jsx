import React, { useEffect } from 'react'
import { Card, Container } from 'react-bootstrap';
import Heading from '../../../layout/Heading';
import BookForm from './components/BookForm';
import { useGetCategoriesQuery } from '../../../../slices/api/categoryApiSlice';
const BookAdd = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();


  return (
    <>
      <Container fluid>
        <Heading heading="Books" breadcrumb={<span>Dashboard <span className='fs-4'>&#8250;</span> Books <span className='fs-4'>&#8250;</span> Add</span>} />
        <Card className="shadow-sm border-0 pt-4 pb-2 px-3">
          <BookForm categories={categories}/>
        </Card>
      </Container>

    </>
  )
}

export default BookAdd;
