import React, { useEffect } from 'react'
import { Badge, Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useGetBookByIdMutation } from '../../../slices/api/BooksApiSlice';
import { setSingleBook, singleBook } from '../../../slices/booksSlice';


const BookDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const book = useSelector(singleBook);

    const [getBook, { isLoading }] = useGetBookByIdMutation();

    useEffect(() => {
        getBookById(id);

    }, [id]);

    const getBookById = async (id) => {
        try {
            const res = await getBook(id);
            dispatch(setSingleBook(res));
        }
        catch (error) {
            console.log(error);
        }

    }

    const convertCapitalize = (category) => {
        return category.charAt(0).toUpperCase() + category.slice(1);
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={8} className='offset-md-2'>

                    <Card className="shadow border-0">
                        <Card.Header className="py-3">
                            <h4>  Book Details</h4>
                        </Card.Header>
                        <div className='table-responsive'>
                            <Table striped bordered hover>

                                <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="2" className="text-center">
                                                Loading...
                                            </td>
                                        </tr>
                                    ) : (
                                        <>
                                            {book.data && (
                                                <>
                                                    <tr>
                                                        <td>Book Name</td>
                                                        <td>{book.data.book.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Category</td>
                                                        <td>{convertCapitalize(book.data.book.category.replace('_', ' '))}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Author</td>
                                                        <td>{book.data.book.author}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Availability</td>
                                                        <td>
                                                            <Badge bg={`${book.data.book.currentAvailability ? 'success' : 'danger'}`} className="pb-2">
                                                                {book.data.book.currentAvailability ? "Available" : "Not Available"}
                                                            </Badge>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Stocks</td>
                                                        <td>{book.data.book.stocks}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Action</td>
                                                        <td>
                                                            <Button variant='success' className='me-2'>Borrow</Button>
                                                            <Button variant='primary'>Return</Button>
                                                        </td>
                                                    </tr>
                                                </>
                                            )}
                                        </>
                                    )}
                                </tbody>

                            </Table>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default BookDetails;