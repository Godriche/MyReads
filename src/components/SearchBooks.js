import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {search} from '../BooksAPI';
import Book from './Book';


const SearchBooks = ({changeShelf, books}) => {
   const [query, setQuery] = useState('');
   const [foundBooks, setFoundBooks] = useState([]);


const handleSearchBooks = async (e) => {
  try {
    const query = e.target.value ;
    setQuery([query]);

  if(query.trim()){
    const res = await search(query);

    res.error ? setFoundBooks(foundBooks) :  setFoundBooks(res);
  }
  else {
    setFoundBooks(foundBooks);
  }
    
  } catch (error) {
    console.log(error);
  }
  
}

  
  return (
    <div className="search-books">
    <div className="search-books-bar">
      <Link 
      className="close-search"
      to='/'
      >Close</Link>
      <div className="search-books-input-wrapper">
        <input 
        type="text" 
        placeholder="Search by title or author"
        value={query} 
        onChange={handleSearchBooks} 
        />
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid">
       {
         foundBooks.length > 0 && foundBooks.map((foundBook) => (
          <Book 
           changeShelf={changeShelf}
           key={foundBook.id}
           books={foundBooks}
          book={foundBook}
           />
         ))
       }
      </ol>
    </div>
  </div>
  )
}

export default SearchBooks
