import React from 'react'
import Book from './Book'


const Bookshelf = ({shelfName, books, changeShelf}) => { 


  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
        {books.map((book) => (
            <li key={book.id}>
            <Book book={book} changeShelf={changeShelf} />
          </li>
          ))
        }
        </ol>
      </div>
    </div>
  )
}

export default Bookshelf
