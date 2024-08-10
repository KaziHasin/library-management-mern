import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Heading from '../../../layout/Heading'
import CustomCard from '../../../utils/CustomCard'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'

const BookList = () => {
  return (
    <>
    <Container fluid>
    <Heading heading="Books" breadcrumb={<span>Dashboard <span className='fs-4'>&#8250;</span> Books</span>} />
    <CustomCard>
    <Row className="my-2">
            <Col>
              <Button variant="primary" as={Link} to="/dashboard/books/add" className="float-end">
                <FaPlus /> Add
              </Button>
            </Col>
          </Row>
    </CustomCard>
    </Container>
    </>
  )
}

export default BookList