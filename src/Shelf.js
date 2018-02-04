import React from 'react'
import PropTypes from 'prop-types';
import Book from './Book';

const Shelf = ({ shelfName, books, moveBookToShelf  }) => {
    const booksJSX = books.map((item) =>
        <Book
            key={item.id}
            thisBook={item}
            cover={item.imageLinks.thumbnail}
            title={item.title}
            authors={item.authors}
            currentShelf={item.shelf}
            moveBookToShelf={moveBookToShelf}
        />
    );
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {booksJSX}
                </ol>
            </div>
        </div>
    );
};

export default Shelf;

Shelf.propTypes = {
    moveBookToShelf: PropTypes.func.isRequired,
    shelfName: PropTypes.string.isRequired,
    books: PropTypes.array,
};
