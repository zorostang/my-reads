import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import { search } from "./BooksAPI";

class Search extends React.Component {
  state = {
    books: [],
  };
  handleChange = (e) => {
    search(e.target.value).then((res) => {
      if (res) {
        this.setState(state => ({
          ...state,
          books: res
        }))
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
