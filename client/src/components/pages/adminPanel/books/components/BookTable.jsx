import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "jquery/dist/jquery.min.js";
import { Badge, Button, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setMessage } from "../../../../../slices/messageSlice";
import { useDeleteBookMutation } from "../../../../../slices/api/booksApiSlice";
import { deleteStoreBook } from "../../../../../slices/booksSlice";

const BookTable = ({ books, currentPage, itemsPerPage }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [deleteBook, { isLoading }] = useDeleteBookMutation();

    const deleteBookHandler = async (bookId) => {
        if (confirm("Are you sure want to delete this book?")) {
            try {
                const res = await deleteBook(bookId);

                if (res.data.status === "success") {
                    const message = res.data.message;
                    dispatch(setMessage(message));
                    dispatch(deleteStoreBook({ id: bookId }));
                } else {
                    toast.error("An error occurred. Please try again.");
                }
            } catch (error) {
                console.log(error);
                toast.error("An error occurred. Please try again.");
            }
        }
    };
    const startIndex = (0, currentPage - 1) * itemsPerPage;

    return (
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Available</th>
                    <th>Stocks</th>
                </tr>
            </thead>
            <tbody>
                {books.length > 0 ? (
                    books.map((book, index) => (
                        <tr key={index}>
                            <td>{startIndex + (index + 1)}</td>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                            <td>{book.category?.name}</td>
                            <td>
                                {book.currentAvailability ? (
                                    <Badge bg="success">Yes</Badge>
                                ) : (
                                    <Badge bg="danger">No</Badge>
                                )}
                            </td>
                            <td>{book.stocks}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    className="me-2 btn-sm"
                                    as={Link}
                                    to={`/dashboard/books/edit/${book._id}`}
                                >
                                    <FaEdit />
                                </Button>
                                <Button
                                    variant="danger"
                                    className="btn-sm"
                                    onClick={() => deleteBookHandler(book._id)}
                                >
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center">
                            No data found
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default BookTable;
