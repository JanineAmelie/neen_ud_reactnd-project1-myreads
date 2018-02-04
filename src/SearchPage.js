import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
/*
For search page,
loop through bookList, and see if any of the ids match the arrays of the results.
if yes, set the 'shelf' key of the object in booklist, to the shelf-less object in the results.
then set the new state. Ask stan how he'd go about this.
* */


class SearchPage extends React.Component {
  state = {
    query: '',
  };

  componentDidMount() {
    console.log('searchPage has mounted');
  }

  handleChange = (event) => {
    this.setState({query: event.target.value});
  };

  handleSubmit = (event) => {
    const self = this;
    console.log(this.state.query);
    event.preventDefault();
    BooksAPI.search(this.state.query).then((results) => {
      console.log(results);
      self.setState({results: results})
    })
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
              {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <form onSubmit={this.handleSubmit}>
              <input type="text" onChange={this.handleChange} value={this.state.query} placeholder="Search by title or author"/>
              <input type="submit" style={ {display: 'none'} } />
          </form>
          </div>
        </div>
        <div className="search-books-results">
            <ol className="books-grid" > {/*Books go here */} </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;

