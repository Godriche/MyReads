import React from 'react'
import Book from './Book'


/**
* @description This is the shelf component 
* @param {shelfName} props - Shelf names passed up to App.js
*  @param {books} props - All the books passed down from App.js
* @param {changeShelf} props - function to move a book between shelves
*/


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
