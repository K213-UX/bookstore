import { useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addBook,
  updateBook,
  deleteBook,
  deleteSelectedBooks,
  toggleSelectBook,
  toggleSelectAll,
  setSortBy,
  toggleSortOrder,
  Book,
  RootState,
  AppDispatch
} from './store'
import BookForm from './components/BookForm'
import BookCard from './components/BookCard'
import Modal from './components/Modal'
import './App.css'

export default function App() {
  const dispatch = useDispatch<AppDispatch>()
  const booksState = useSelector((state: RootState) => state.books)
  const [showModal, setShowModal] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  const sortedBooks = useMemo(() => {
    const sorted = [...booksState.books].sort((a, b) => {
      let comparison = 0

      switch (booksState.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title, 'zh')
          break
        case 'price':
          comparison = a.price - b.price
          break
        case 'author':
          comparison = a.author.localeCompare(b.author, 'zh')
          break
        default:
          comparison = a.title.localeCompare(b.title, 'zh')
      }

      return booksState.sortOrder === 'asc' ? comparison : -comparison
    })
    return sorted
  }, [booksState.books, booksState.sortBy, booksState.sortOrder])

  const selectedCount = booksState.books.filter(b => b.selected).length
  const allSelected = booksState.books.length > 0 && selectedCount === booksState.books.length

  const handleAddBook = useCallback((book: Book) => {
    dispatch(addBook(book))
    setShowModal(false)
  }, [dispatch])

  const handleUpdateBook = useCallback((book: Book) => {
    dispatch(updateBook(book))
    setShowModal(false)
    setEditingBook(null)
  }, [dispatch])

  const handleDeleteBook = useCallback((id: string) => {
    if (confirm('确定删除此书籍吗？')) {
      dispatch(deleteBook(id))
    }
  }, [dispatch])

  const handleSelectBook = useCallback((id: string) => {
    dispatch(toggleSelectBook(id))
  }, [dispatch])

  const handleSelectAll = useCallback((checked: boolean) => {
    dispatch(toggleSelectAll(checked))
  }, [dispatch])

  const handleDeleteSelected = useCallback(() => {
    if (selectedCount > 0 && confirm(`确定删除选中的 ${selectedCount} 本书籍吗？`)) {
      dispatch(deleteSelectedBooks())
    }
  }, [dispatch, selectedCount])

  const handleEditBook = useCallback((book: Book) => {
    setEditingBook(book)
    setShowModal(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setShowModal(false)
    setEditingBook(null)
  }, [])

  const handleOpenAddModal = useCallback(() => {
    setEditingBook(null)
    setShowModal(true)
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>在线图书系统</h1>
      </header>

      <nav className="toolbar">
        <div className="toolbar-left">
          <button className="btn btn-primary" onClick={handleOpenAddModal}>
            + 添加书籍
          </button>
          {selectedCount > 0 && (
            <button className="btn btn-danger" onClick={handleDeleteSelected}>
              删除选中 ({selectedCount})
            </button>
          )}
        </div>

        <div className="toolbar-right">
          <select
            value={booksState.sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value as 'title' | 'price' | 'author'))}
            className="sort-select"
          >
            <option value="title">按书名排序</option>
            <option value="price">按价格排序</option>
            <option value="author">按作者排序</option>
          </select>
          <button
            className="btn btn-secondary"
            onClick={() => dispatch(toggleSortOrder())}
            title={booksState.sortOrder === 'asc' ? '升序' : '降序'}
          >
            {booksState.sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </nav>

      <div className="books-container">
        {booksState.books.length > 0 && (
          <div className="select-all">
            <label>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
              <span>全选</span>
            </label>
          </div>
        )}

        <div className="books-grid">
          {sortedBooks.length === 0 ? (
            <div className="empty-state">
              <p>暂无书籍，点击"添加书籍"开始</p>
            </div>
          ) : (
            sortedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={handleEditBook}
                onDelete={handleDeleteBook}
                onSelect={handleSelectBook}
              />
            ))
          )}
        </div>
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <BookForm
            book={editingBook}
            onSubmit={editingBook ? handleUpdateBook : handleAddBook}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  )
}
