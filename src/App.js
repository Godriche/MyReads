import React, { useState, useEffect } from 'react'
import { Link, Route } from 'react-router-dom';
import './App.css';
import Bookshelf from './components/Bookshelf';
import SearchBooks from './components/SearchBooks';
import {update, getAll} from './BooksAPI';

/**
* @description This is the App/parent component 
*/

const App = () => {
const [allBooks, setAllbooks] = useState([]);

// TODO: Filter Book response from BooksAPI.getAll into respective shelves
const currentShelf = allBooks.filter(book => book.shelf === 'currentlyReading');
const wantShelf = allBooks.filter(book => book.shelf === 'wantToRead');
const readShelf = allBooks.filter(book => book.shelf === 'read');


// TODO: Update shelf with book of choice
const handleChangeShelf = async (book, shelf) => {
   await update(book, shelf);  
    const changeBook = await getAll();
   setAllbooks(changeBook);  
}


// TODO: get all books from BooksAPI
useEffect(() => {
  getAll()
      .then(allBooks => {
        setAllbooks(allBooks);
      })
    
}, []);



  return (
    <div className="app">
      <Route exact path="/search" component={() =>(
        <SearchBooks 
        books={allBooks} 
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
      <Link to ="/search">
        <span className="open-search-button">        
           Add a book           
        </span>
        </Link>  
      </div>
     </>
      )}/>
      
    </div>
  )
}

export default App
