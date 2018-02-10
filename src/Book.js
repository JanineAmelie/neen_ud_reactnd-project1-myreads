import React from 'react';
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger';

const generateAuthors = (authorsArray) => authorsArray.map((author) => <span key={author}>{author}</span>);

const Book = ({
  thisBook, cover, title, authors, currentShelf, moveBookToShelf,
}) =>
  (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${cover}")` }} />
          <BookShelfChanger thisBook={thisBook} moveBookToShelf={moveBookToShelf} currentShelf={currentShelf} />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors && generateAuthors(authors)}</div>
      </div>
    </li>
  );

export default Book;

Book.defaultProps = {
  currentShelf: 'none',
  authors: [],
};

Book.propTypes = {
  moveBookToShelf: PropTypes.func.isRequired,
  thisBook: PropTypes.object.isRequired,
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array,
  currentShelf: PropTypes.string,
};

