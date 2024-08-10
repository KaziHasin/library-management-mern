import React, { useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import Heading from "../../../layout/Heading";
import BookForm from "./components/BookForm";
import { useGetCategoriesQuery } from "../../../../slices/api/categoryApiSlice";
import { useCreateBookMutation } from "../../../../slices/api/booksApiSlice";
const BookAdd = () => {
    const { data: categories } = useGetCategoriesQuery();
    const [createBook, { isLoading }] = useCreateBookMutation();
    const handleAddBook = async (bookData) => {
        try {
            const res = await createBook(bookData);

            if (res.data && res.data.status === "success") {
                console.log(res.data);

                // navigate('/dashboard/users');
            }
        } catch (err) {
            console.log(err);
            toast.error("An error occurred. Please try again.");
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
