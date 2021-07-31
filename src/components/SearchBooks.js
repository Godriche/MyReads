import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {search} from '../BooksAPI';
import Book from './Book';

/**
* @description This is the search component
* @param {changeShelf} prop - Prop to move a book between shelves
*/


const SearchBooks = ({changeShelf, books}) => {
   const [query, setQuery] = useState('');
   const [foundBooks, setFoundBooks] = useState([]);

   


const handleSearchBooks = async (e) => {
  
  try {
    const query = e.target.value ;
    setQuery(query);

  if(query.trim()){
    const response = await search(query);   
    response.error === true ? setFoundBooks(foundBooks) :  setFoundBooks(response);
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
         foundBooks.length > 0 && foundBooks.map((foundBook) => {
           const targetShelf = books.find( b => b.id === foundBook.id); 
          
           if(targetShelf ) {
             foundBook.shelf = targetShelf.shelf; 
           } else {
             foundBook.shelf = "none";
           }

        return <Book 
           changeShelf={changeShelf}
           key={foundBook.id}
           books={foundBooks}
           book={foundBook}
           />
         }          
          
         )
       }
      </ol>
    </div>
  </div>
  )
}

export default SearchBooks
