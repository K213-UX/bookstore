import { Book } from '../store'
import './BookCard.css'

interface BookCardProps {
  book: Book
  onEdit: (book: Book) => void
  onDelete: (id: string) => void
  onSelect: (id: string) => void
}

export default function BookCard({
  book,
  onEdit,
  onDelete,
  onSelect
}: BookCardProps) {
  return (
    <div className={`book-card ${book.selected ? 'selected' : ''}`}>
      {book.cover ? (
        <div className="book-cover-wrap">
          <img src={book.cover} alt={book.title} className="book-cover" />
        </div>
      ) : null}

      <div className="book-card-header">
        <input
          type="checkbox"
          checked={book.selected || false}
          onChange={() => onSelect(book.id)}
          className="book-checkbox"
        />
        <span className="book-category">{book.category}</span>
      </div>

      <div className="book-card-content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">作者：{book.author}</p>
        {book.description ? <p className="book-description">{book.description}</p> : null}
        <p className="book-price">
          {book.price > 0 ? `¥ ${book.price.toFixed(2)}` : '价格待补充'}
        </p>
      </div>

      <div className="book-card-actions">
        <button
          className="btn btn-small btn-info"
          onClick={() => onEdit(book)}
          title="编辑"
        >
          编辑
        </button>
        <button
          className="btn btn-small btn-danger"
          onClick={() => onDelete(book.id)}
          title="删除"
        >
          删除
        </button>
      </div>
    </div>
  )
}
