import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books: [],
    book: {}
};

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload;
        },
        setSingleBook: (state, action) => {
            state.book = action.payload;
        }
    }
});

export const { setBooks } = booksSlice.actions;
export const selectBooks = (state) => state.books.books;
export const singleBook = (state) => state.book.book;
export const { setSingleBook } = booksSlice.actions;
export default booksSlice.reducer;