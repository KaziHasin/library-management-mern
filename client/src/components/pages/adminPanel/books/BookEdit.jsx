import React, { useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import Heading from "../../../layout/Heading";
import BookForm from "./components/BookForm";
import { useGetCategoriesQuery } from "../../../../slices/api/categoryApiSlice";

import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const BookEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: categories } = useGetCategoriesQuery();
    const { id } = useParams();

    const handleAddBook = async (bookData) => {};
    return (
        <>
            <Container fluid>
                <Heading
                    heading="Books"
                    breadcrumb={
                        <span>
                            Dashboard <span className="fs-4">&#8250;</span>
                            Books <span className="fs-4">&#8250;</span> Add
                        </span>
                    }
                />
                <Card className="shadow-sm border-0 pt-4 pb-2 px-3">
                    <BookForm
                        categories={categories}
                        onSubmit={handleAddBook}
                        buttonText="Update"
                    />
                </Card>
            </Container>
        </>
    );
};

export default BookEdit;
