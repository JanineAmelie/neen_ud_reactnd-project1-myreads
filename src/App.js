import React from 'react'
import { Route } from 'react-router-dom';
import { getAll } from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage';
import Shelf from './Shelf';
import { Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    //  all books
    booklist: [],
  };

  componentDidMount() {
    getAll().then((books) => {
        this.setState({ booklist: books });
        this.sortBooksIntoShelves(this.state.booklist);
    })
  }

  sortBooksIntoShelves(bookList) {
    let tempWantToRead = [];
    let tempCurrentlyReading = [];
    let tempRead = [];

    bookList.map((book) => { // eslint-disable-next-line array-callback-return
      if (book.shelf === 'wantToRead') {
          tempWantToRead.push(book);
      } else if (book.shelf === 'currentlyReading') {
          tempCurrentlyReading.push(book);
      } else if (book.shelf === 'read') {
          tempRead.push(book);
      }
    });
    this.setState(
      {
      currentlyReadingShelf: tempCurrentlyReading,
      wantToReadShelf: tempWantToRead,
      readShelf: tempRead,
      }
    )
  }
  render() {

    return (
      <div className="app">

        <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1 className="main-title">neenReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                    { this.state.currentlyReadingShelf && <Shelf shelfName="Currently Reading" books={this.state.currentlyReadingShelf} />}
                    { this.state.wantToReadShelf && <Shelf shelfName="Want to Read" books={this.state.wantToReadShelf} />  }
                    { this.state.readShelf && <Shelf shelfName="Read" books={this.state.readShelf} /> }
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
        )} />

        <Route path="/search" render={() => <SearchPage />}/>
      </div>
    )
  }
}

export default BooksApp
