import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import { search } from "./BooksAPI";
class Search extends React.Component {
  state = {
    books: [],
    bookShelf: this.props.bookShelf,
  };

  handleChange = (e) => {
    search(e.target.value).then((res) => {
      if (res) {
        this.combine(res)
      } else {
        this.setState(state => ({
          ...state,
          books: []
        }))
      }
    }).catch(err => {
      console.log(err)
    });
  };
  
  // replaces search results book with book from bookshelf, if match exists
  combine = (res) => {
    const replaced = res.map(book => {
      // if discovered book is in bookshelf then replace with bookShelf book
      for (let myBook of this.state.bookShelf) {
        if (book.id === myBook.id) {
          return myBook
        }
      }
      return book
    })
    this.setState(state => ({
      ...state,
      books: replaced
    }))
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to={"/"} className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(this.state.books.length > 0) && this.state.books.map((book, i) => (
              <Book key={i} book={book} methods={this.props.methods} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
