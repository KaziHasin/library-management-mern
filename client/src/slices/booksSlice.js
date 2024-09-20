import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books: [],
    book: {},
};

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload);
        },
        setBooks: (state, action) => {
            state.books = action.payload;
        },
        setSingleBook: (state, action) => {
            state.book = action.payload;
        },
        getSingleBook: (state, action) => {
            const foundBook = state.books.find(
                (book) => book._id === action.payload
            );
            if (foundBook) {
                state.book = foundBook;
            }
        },
        updateStoreBook: (state, action) => {
            const { id, updatedBook } = action.payload;
            const index = state.books.findIndex((book) => book._id === id);
            if (index !== -1) {
                state.books[index] = updatedBook;
            }
        },
        deleteStoreBook: (state, action) => {
            const { id } = action.payload;
            state.books = state.books.filter((book) => book._id !== id);
        },
        resetBooks: (state) => {
            state.books = [];
        },
    },
});

export const {
    addBook,
    setBooks,
    resetBooks,
    getSingleBook,
    updateStoreBook,
    deleteStoreBook,
} = booksSlice.actions;
export const selectBooks = (state) => state.books.books;
export const singleBook = (state) => state.book.book;
export const selectSingleBook = (state) => state.book.book;
export const { setSingleBook } = booksSlice.actions;
export default booksSlice.reducer;
