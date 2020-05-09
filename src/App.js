import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import BookShelf from "./BookShelf";
import { getAll } from "./BooksAPI";
import { Link, Route } from "react-router-dom";
import Search from "./Search";
class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    none: [],
  };
  async getAll() {
    const books = await getAll();
    this.setState((state) => ({
      ...state,
      currentlyReading: books.filter((book) => book.shelf === "currentlyReading"),
      wantToRead: books.filter((book) => book.shelf === "wantToRead"),
      read: books.filter((book) => book.shelf === "read"),
      none: books.filter((book) => book.shelf === "none"),
    }));
  }
  componentDidMount() {
    this.getAll();
  }

  allBooks() {
    return [...this.state.currentlyReading, ...this.state.wantToRead, ...this.state.read ]
  }
  render() {
    return (
      <div className="app">
        <Route path="/search" render={(props) => <Search {...props} methods={{ getAll: this.getAll.bind(this) }} bookShelf={this.allBooks()} />} />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                    books={this.state.currentlyReading}
                    shelf={"Currently Reading"}
                    methods={{ getAll: this.getAll.bind(this) }}
                  />
                  <BookShelf
                    books={this.state.wantToRead}
                    shelf={"Want To Read"}
                    methods={{ getAll: this.getAll.bind(this) }}
                  />
                  <BookShelf
                    books={this.state.read}
                    shelf={"Read"}
                    methods={{ getAll: this.getAll.bind(this) }}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search" className="open-search">
                  Add a book
                </Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
