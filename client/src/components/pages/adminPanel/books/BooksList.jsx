import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Heading from "../../../layout/Heading";
import CustomCard from "../../../utils/CustomCard";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { resetMessage } from "../../../../slices/messageSlice";
import withToast from "../../../../hoc/withToast";
import BookTable from "./components/BookTable";
import { useGetBookListQuery } from "../../../../slices/api/booksApiSlice";
import Loader from "../../../utils/Loader";
import ServerError from "../../../../errors/ServerError";
import { resetBooks, setBooks } from "../../../../slices/booksSlice";
import {
    setTotalData,
    setTotalPages,
} from "../../../../slices/paginationHelperSlice";
import CustomPagination from "../../../utils/CustomPagination";
import ItemsPerPageSelect from "../../../utils/ItemsPerPageSelect";

const BooksList = ({ showSuccess }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.books);

    const message = useSelector((state) => state.message.message);

    const {
        data: fetchedBooks,
        error,
        isLoading,
        refetch,
    } = useGetBookListQuery({
        page: currentPage,
        perPage: itemsPerPage,
        searchTerm,
    });
    useEffect(() => {
        if (fetchedBooks) {
            dispatch(resetBooks());
            dispatch(setTotalPages({ totalPages: fetchedBooks.totalPages }));
            dispatch(setTotalData({ totalData: fetchedBooks.totalBooks }));
            dispatch(setBooks(fetchedBooks.books));
        }
    }, [fetchedBooks, dispatch]);

    useEffect(() => {
        if (message) {
            showSuccess(message);
            dispatch(resetMessage());
            refetch();
        }
    }, [dispatch, message, refetch]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
        refetch();
    };

    const handleSearch = (e) => {
        setCurrentPage(1);

        setSearchTerm(e.target.value);
    };

    if (isLoading) {
        return (
            <div className="loading">
                <Loader />
            </div>
        );
    }
    if (error) {
        <ServerError error={error} />;
    }

    return (
        <>
            <Container fluid>
                <Heading
                    heading="Books"
                    breadcrumb={
                        <span>
                            Dashboard <span className="fs-4">&#8250;</span>{" "}
                            Books
                        </span>
                    }
                />
                <CustomCard>
                    <Row className="my-2">
                        <Col>
                            <Button
                                variant="primary"
                                as={Link}
                                to="/dashboard/books/add"
                                className="float-end"
                            >
                                <FaPlus /> Add
                            </Button>
                        </Col>
                        <div className="d-flex justify-content-between my-3">
                            <ItemsPerPageSelect
                                itemsPerPage={itemsPerPage}
                                onItemsPerPageChange={handleItemsPerPageChange}
                            />
                            <Form.Control
                                type="text"
                                value={searchTerm}
                                placeholder="Search......"
                                style={{ width: "230px" }}
                                onChange={handleSearch}
                            />
                        </div>

                        <BookTable
                            books={books}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                        />
                        <CustomPagination
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            dataLength={books.length}
                        />
                    </Row>
                </CustomCard>
            </Container>
        </>
    );
};

export default withToast(BooksList);
