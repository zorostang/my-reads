import React from "react";
import BookShelfChanger from './BookShelfChanger'

const Book = props => {
  if (!props) return "loading..."
  return (
    <li>
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage:
              `url("${props.book.imageLinks.smallThumbnail}")`,
          }}
        ></div>
        <BookShelfChanger book={props.book} methods={props.methods}/>
      </div>
        <div className="book-title">{props.book.title}</div>
        { props.book.authors && props.book.authors.map((author,i) => <div key={i} className="book-authors">{author}</div>)}
    </div>
    </li>
  );
};

export default Book