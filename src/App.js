import React, { useState, useEffect } from 'react'
import { Link, Route } from 'react-router-dom';
import './App.css';
import Bookshelf from './components/Bookshelf';
import SearchBooks from './components/SearchBooks';
import {update, getAll} from './BooksAPI';

const App = () => {
const [allBooks, setAllbooks] = useState([]);

const currentShelf = allBooks.filter(book => book.shelf === 'currentlyReading');
const wantShelf = allBooks.filter(book => book.shelf === 'wantToRead');
const readShelf = allBooks.filter(book => book.shelf === 'read');


const handleChangeShelf = async (book, shelf) => {
   await update(book, shelf);  
   const changeBook = await getAll();
   setAllbooks(changeBook);
  
}


useEffect(() => {
  getAll()
      .then(allBooks => {
        setAllbooks(allBooks);
      })
    
}, []);



  return (
    <div className="app">
      <Route exact path="/search-books" component={() =>(
        <SearchBooks 
        // bookSearch={handleSearchBooks} 
        books={allBooks} 
        // searchBooks={searchBooks}
        changeShelf={handleChangeShelf}/>
      )}/>

      <Route exact path="/" component={()=> (
        <>
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf 
            books={currentShelf}  
            shelfName={'Currently Reading'}
            changeShelf={handleChangeShelf}
            />
            <Bookshelf 
            books={wantShelf}  
            changeShelf={handleChangeShelf}
            shelfName={'Want To Read'}  />
            <Bookshelf 
            books={readShelf} 
            changeShelf={handleChangeShelf} 
            shelfName={'Read'} />
          </div>
        </div>
      </div>
      <div className="open-search">
      <Link to ="/search-books">
        <button>        
           Add a book           
        </button>
        </Link>  
      </div>
     </>
      )}/>
      
    </div>
  )
}

export default App
