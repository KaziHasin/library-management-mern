import React, { useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import Heading from "../../../layout/Heading";
import BookForm from "./components/BookForm";
import { useGetCategoriesQuery } from "../../../../slices/api/categoryApiSlice";
import { useCreateBookMutation } from "../../../../slices/api/booksApiSlice";
import { setMessage } from "../../../../slices/messageSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBook } from "../../../../slices/booksSlice";
const BookAdd = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: categories } = useGetCategoriesQuery();
    const [createBook, { isLoading }] = useCreateBookMutation();
    const handleAddBook = async (bookData) => {
        try {
            const res = await createBook(bookData);

            if (res.data && res.data.status === "success") {
                const message = res.data.message;
                const book = res.data.book;
                dispatch(setMessage(message));
                dispatch(addBook(book));
                navigate("/dashboard/books");
            }
        } catch (err) {
            console.log(err);
            // toast.error("An error occurred. Please try again.");
        }
    };
    return (
        <>
            <Container fluid>
                <Heading
                    heading="Books"
                    breadcrumb={
                        <span>
                            Dashboard <span className="fs-4">&#8250;</span>{" "}
                            Books <span className="fs-4">&#8250;</span> Add
                        </span>
                    }
                />
                <Card className="shadow-sm border-0 pt-4 pb-2 px-3">
                    <BookForm
                        categories={categories}
                        onSubmit={handleAddBook}
                    />
                </Card>
            </Container>
        </>
    );
};

export default BookAdd;
