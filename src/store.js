import { configureStore, createSlice } from '@reduxjs/toolkit';
import { ocrBooks } from './data/ocrBooks';
const initialState = {
    books: ocrBooks,
    sortBy: 'title',
    sortOrder: 'asc'
};
const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload;
        },
        addBook: (state, action) => {
            state.books.push(action.payload);
        },
        updateBook: (state, action) => {
            const index = state.books.findIndex(b => b.id === action.payload.id);
            if (index !== -1) {
                state.books[index] = action.payload;
            }
        },
        deleteBook: (state, action) => {
            state.books = state.books.filter(b => b.id !== action.payload);
        },
        deleteSelectedBooks: (state) => {
            state.books = state.books.filter(b => !b.selected);
        },
        toggleSelectBook: (state, action) => {
            const book = state.books.find(b => b.id === action.payload);
            if (book) {
                book.selected = !book.selected;
            }
        },
        toggleSelectAll: (state, action) => {
            state.books.forEach(b => {
                b.selected = action.payload;
            });
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        toggleSortOrder: (state) => {
            state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
        }
    }
});
export const { setBooks, addBook, updateBook, deleteBook, deleteSelectedBooks, toggleSelectBook, toggleSelectAll, setSortBy, toggleSortOrder } = booksSlice.actions;
export const store = configureStore({
    reducer: {
        books: booksSlice.reducer
    }
});
