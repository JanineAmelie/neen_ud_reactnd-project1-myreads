import React from 'react';
import PropTypes from 'prop-types';

const BookShelfChanger = (props) => {
  function handleChange(e) {
    e.preventDefault();
    const newSelectedShelf = e.target.value;
    props.moveBookToShelf(props.thisBook, newSelectedShelf);
  }

  return (
    <div className="book-shelf-changer">
      <select value={props.currentShelf} onChange={handleChange}>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookShelfChanger;

BookShelfChanger.propTypes = {
  thisBook: PropTypes.object.isRequired,
  moveBookToShelf: PropTypes.func.isRequired,
  currentShelf: PropTypes.string,
};
