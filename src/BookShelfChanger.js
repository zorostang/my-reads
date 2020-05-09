import React from 'react'
import { update } from './BooksAPI'
const BookShelfChanger = props => {
  const handleChange = e => {
    update(props.book, e.target.value).then(() => props.methods.getAll())
  }
  return (
    <div className="book-shelf-changer">
      <select onChange={handleChange} defaultValue={props.book.shelf || "none"}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookShelfChanger
