import React from "react";
import BookShelfChanger from './BookShelfChanger'

const Book = props => {
  if (!props) return "loading..."
  function BookCover(props) {
    if (props.imageLinks && props.imageLinks.smallThumbnail) {
      return (
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage:
              `url("${props.imageLinks.smallThumbnail}")`,
          }}
        ></div>
      )
    }
    return (
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
        }}
      ></div>
    ) 
  }
  return (
    <li>
    <div className="book">
      <div className="book-top">
        <BookCover imageLinks={props.book.imageLinks} />
        <BookShelfChanger book={props.book} methods={props.methods}/>
      </div>
        <div className="book-title">{props.book.title}</div>
        { props.book.authors && props.book.authors.map((author,i) => <div key={i} className="book-authors">{author}</div>)}
    </div>
    </li>
  );
};

export default Book