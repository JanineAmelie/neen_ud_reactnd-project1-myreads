import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchPage extends React.Component {
  state = {
    query: '',
    resultsArray: [],
    resultsWithStatus: [],
  };

  componentDidMount() {
  }

  handleChange = (event) => {
    this.setState({query: event.target.value});
    event.preventDefault();
    this.performSearch(event);
  };


  performSearch = (event) => {
    const self = this;
    event.preventDefault();
    if (/\S/.test(this.state.query)) {
      BooksAPI.search(this.state.query).then((results) => {
        if (results) {
          self.setState({results: results});
          this.handleResults(this.state.results, this.props.bookList,);
        }
      })
    }
  };

  handleBookChangeInSearch = (book, newShelf) => {
    // make copies of values just in case.
    const theBook = book;
    const theResultsWithStatus = this.state.resultsWithStatus;

    // set the newShelf of the book
    theBook.shelf = newShelf;

    // find the indexOf the book we want to update, in the resultsWithStatus array. using the ID of the book
    const theIndex = theResultsWithStatus.findIndex((resultsBook) => {
      return theBook.id === resultsBook.id;
    });

    // if it found something
    if (theIndex !== -1) {
      //replace the value of theResultsWithStatus[theIndex] with theBook;
      theResultsWithStatus[theIndex] = theBook;
      //set the state so components will re-render
      this.setState( { resultsWithStatus: theResultsWithStatus });
    }

    // call the moveBookToShelf method defined in APP so we can update it in the backEnd too :-)
    this.props.moveBookToShelf(book, newShelf)
  };

  // is called, right after a search is performed
  handleResults = (resultsArray, myLibrary) => {
    const resultsArrayWithShelfStatus = []; // [{}, {}, {},]
    //loop through resultsArray;

    if (resultsArray.length !== 0) {
      resultsArray.forEach((result) => {
        //checks if the id of the result matches any of the IDs in my library.
        myLibrary.forEach((book) => {
          if (book.id === result.id) {
            result.shelf = book.shelf;
          }
        });
        resultsArrayWithShelfStatus.push(result);
      });
      this.setState({ resultsWithStatus: resultsArrayWithShelfStatus });
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
          <form onSubmit={this.performSearch}>
              <input type="text" onChange={this.handleChange} value={this.state.query} placeholder="Search by title or author"/>
              <input type="submit" style={ {display: 'none'} } />
          </form>
          </div>
        </div>
        <div className="search-books-results">
            <ol className="books-grid" >
              {
              this.state.resultsWithStatus.length > 0 ?
                this.state.resultsWithStatus.map((item) => (
                <Book
                key={item.id}
                thisBook={item}
                cover={item.imageLinks.thumbnail}
                title={item.title}
                authors={item.authors}
                currentShelf={item.shelf}
                moveBookToShelf={this.handleBookChangeInSearch}
                />)) : ''
              }
            </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;

