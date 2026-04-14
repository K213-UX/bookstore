import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, updateBook, deleteBook, deleteSelectedBooks, toggleSelectBook, toggleSelectAll, setSortBy, toggleSortOrder } from './store';
import BookForm from './components/BookForm';
import BookCard from './components/BookCard';
import Modal from './components/Modal';
import './App.css';
export default function App() {
    const dispatch = useDispatch();
    const booksState = useSelector((state) => state.books);
    const [showModal, setShowModal] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const sortedBooks = useMemo(() => {
        const sorted = [...booksState.books].sort((a, b) => {
            let comparison = 0;
            switch (booksState.sortBy) {
                case 'title':
                    comparison = a.title.localeCompare(b.title, 'zh');
                    break;
                case 'price':
                    comparison = a.price - b.price;
                    break;
                case 'author':
                    comparison = a.author.localeCompare(b.author, 'zh');
                    break;
                default:
                    comparison = a.title.localeCompare(b.title, 'zh');
            }
            return booksState.sortOrder === 'asc' ? comparison : -comparison;
        });
        return sorted;
    }, [booksState.books, booksState.sortBy, booksState.sortOrder]);
    const selectedCount = booksState.books.filter(b => b.selected).length;
    const allSelected = booksState.books.length > 0 && selectedCount === booksState.books.length;
    const handleAddBook = useCallback((book) => {
        dispatch(addBook(book));
        setShowModal(false);
    }, [dispatch]);
    const handleUpdateBook = useCallback((book) => {
        dispatch(updateBook(book));
        setShowModal(false);
        setEditingBook(null);
    }, [dispatch]);
    const handleDeleteBook = useCallback((id) => {
        if (confirm('确定删除此书籍吗？')) {
            dispatch(deleteBook(id));
        }
    }, [dispatch]);
    const handleSelectBook = useCallback((id) => {
        dispatch(toggleSelectBook(id));
    }, [dispatch]);
    const handleSelectAll = useCallback((checked) => {
        dispatch(toggleSelectAll(checked));
    }, [dispatch]);
    const handleDeleteSelected = useCallback(() => {
        if (selectedCount > 0 && confirm(`确定删除选中的 ${selectedCount} 本书籍吗？`)) {
            dispatch(deleteSelectedBooks());
        }
    }, [dispatch, selectedCount]);
    const handleEditBook = useCallback((book) => {
        setEditingBook(book);
        setShowModal(true);
    }, []);
    const handleCloseModal = useCallback(() => {
        setShowModal(false);
        setEditingBook(null);
    }, []);
    const handleOpenAddModal = useCallback(() => {
        setEditingBook(null);
        setShowModal(true);
    }, []);
    return (_jsxs("div", { className: "app", children: [_jsxs("header", { className: "app-header", children: [_jsx("h1", { children: "\u5728\u7EBF\u56FE\u4E66\u7CFB\u7EDF" }), _jsx("p", { children: "\u5DF2\u6309\u56FE\u7247\u5C01\u9762 OCR \u8BC6\u522B\u7ED3\u679C\u5BFC\u5165\u56FE\u4E66\uFF0C\u5C11\u91CF\u4F4E\u6E05\u56FE\u7247\u5DF2\u6807\u8BB0\u5F85\u6821" })] }), _jsxs("nav", { className: "toolbar", children: [_jsxs("div", { className: "toolbar-left", children: [_jsx("button", { className: "btn btn-primary", onClick: handleOpenAddModal, children: "+ \u6DFB\u52A0\u4E66\u7C4D" }), selectedCount > 0 && (_jsxs("button", { className: "btn btn-danger", onClick: handleDeleteSelected, children: ["\u5220\u9664\u9009\u4E2D (", selectedCount, ")"] }))] }), _jsxs("div", { className: "toolbar-right", children: [_jsxs("select", { value: booksState.sortBy, onChange: (e) => dispatch(setSortBy(e.target.value)), className: "sort-select", children: [_jsx("option", { value: "title", children: "\u6309\u4E66\u540D\u6392\u5E8F" }), _jsx("option", { value: "price", children: "\u6309\u4EF7\u683C\u6392\u5E8F" }), _jsx("option", { value: "author", children: "\u6309\u4F5C\u8005\u6392\u5E8F" })] }), _jsx("button", { className: "btn btn-secondary", onClick: () => dispatch(toggleSortOrder()), title: booksState.sortOrder === 'asc' ? '升序' : '降序', children: booksState.sortOrder === 'asc' ? '↑' : '↓' })] })] }), _jsxs("div", { className: "books-container", children: [booksState.books.length > 0 && (_jsx("div", { className: "select-all", children: _jsxs("label", { children: [_jsx("input", { type: "checkbox", checked: allSelected, onChange: (e) => handleSelectAll(e.target.checked) }), _jsx("span", { children: "\u5168\u9009" })] }) })), _jsx("div", { className: "books-grid", children: sortedBooks.length === 0 ? (_jsx("div", { className: "empty-state", children: _jsx("p", { children: "\u6682\u65E0\u4E66\u7C4D\uFF0C\u70B9\u51FB\"\u6DFB\u52A0\u4E66\u7C4D\"\u5F00\u59CB" }) })) : (sortedBooks.map((book) => (_jsx(BookCard, { book: book, onEdit: handleEditBook, onDelete: handleDeleteBook, onSelect: handleSelectBook }, book.id)))) })] }), showModal && (_jsx(Modal, { onClose: handleCloseModal, children: _jsx(BookForm, { book: editingBook, onSubmit: editingBook ? handleUpdateBook : handleAddBook, onCancel: handleCloseModal }) }))] }));
}
