import React from "react";
import BookList from "./BookList"

const BookShelf = (props) => {
  if (!props) return "Loading..."
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelf}</h2>
      <BookList books={props.books} methods={props.methods}/>
    </div>
  );
};

export default BookShelf
