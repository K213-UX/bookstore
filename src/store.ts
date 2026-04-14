import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ocrBooks } from './data/ocrBooks'

export interface Book {
  id: string
  title: string
  author: string
  price: number
  category: string
  description?: string
  cover?: string
  selected?: boolean
}

interface BooksState {
  books: Book[]
  sortBy: 'title' | 'price' | 'author'
  sortOrder: 'asc' | 'desc'
}

const initialState: BooksState = {
  books: ocrBooks,
  sortBy: 'title',
  sortOrder: 'asc'
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload
    },
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload)
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex(b => b.id === action.payload.id)
      if (index !== -1) {
        state.books[index] = action.payload
      }
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(b => b.id !== action.payload)
    },
    deleteSelectedBooks: (state) => {
      state.books = state.books.filter(b => !b.selected)
    },
    toggleSelectBook: (state, action: PayloadAction<string>) => {
      const book = state.books.find(b => b.id === action.payload)
      if (book) {
        book.selected = !book.selected
      }
    },
    toggleSelectAll: (state, action: PayloadAction<boolean>) => {
      state.books.forEach(b => {
        b.selected = action.payload
      })
    },
    setSortBy: (state, action: PayloadAction<'title' | 'price' | 'author'>) => {
      state.sortBy = action.payload
    },
    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc'
    }
  }
})

export const {
  setBooks,
  addBook,
  updateBook,
  deleteBook,
  deleteSelectedBooks,
  toggleSelectBook,
  toggleSelectAll,
  setSortBy,
  toggleSortOrder
} = booksSlice.actions

export const store = configureStore({
  reducer: {
    books: booksSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
