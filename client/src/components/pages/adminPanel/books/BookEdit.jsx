import React, { useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import Heading from "../../../layout/Heading";
import BookForm from "./components/BookForm";
import { useGetCategoriesQuery } from "../../../../slices/api/categoryApiSlice";
import { setMessage } from "../../../../slices/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    getSingleBook,
    selectSingleBook,
    updateStoreBook,
} from "../../../../slices/booksSlice";
import { useUpdateBookMutation } from "../../../../slices/api/booksApiSlice";
const BookEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: categories } = useGetCategoriesQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const { id } = useParams();
    const book = useSelector(selectSingleBook);
    const [updateBook, isLoading] = useUpdateBookMutation();
    useEffect(() => {
        if (id) {
            dispatch(getSingleBook(id));
        }
    }, [id, dispatch]);

    const handleUpdateBook = async (bookData) => {
        console.log(bookData);

        const res = await updateBook({ id, data: bookData });
        if (res.data && res.data.status === "success") {
            dispatch(updateStoreBook({ id, updatedBook: bookData }));
            const message = res.data.message;
            dispatch(setMessage(message));
            navigate("/dashboard/books");
        }
    };
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
                        book={book}
                        onSubmit={handleUpdateBook}
                        buttonText="Update"
                    />
                </Card>
            </Container>
        </>
    );
};

export default BookEdit;
