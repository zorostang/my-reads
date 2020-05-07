import React from "react"
import Book from './Book'

const BookList = (props) => {
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.map((book, i) => <Book key={i} book={book} methods={props.methods}/>)}
      </ol>
    </div>
  );
};

export default BookList;
