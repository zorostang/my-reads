import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import BookShelf from "./BookShelf";
import { getAll } from "./BooksAPI";
import { Link, Route } from "react-router-dom";
import Search from "./Search";
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    // There's no needs for books to manage their own state. Everything can be managed at the application level
    // This means all other components can be functional components only
    currentlyReading: [],
    wantToRead: [],
    read: [],
    none: [],
  };
  async getAll() {
    const books = await getAll();
    console.log(books);
    this.setState((state) => ({
      ...state,
      currentlyReading: books.filter(
        (book) => book.shelf === "currentlyReading"
      ),
      wantToRead: books.filter((book) => book.shelf === "wantToRead"),
      read: books.filter((book) => book.shelf === "read"),
      none: books.filter((book) => book.shelf === "none"),
    }));
  }
  componentDidMount() {
    this.getAll();
  }
  render() {
    return (
      <div className="app">
        <Route path="/search" render={(props) => <Search {...props} methods={{ getAll: this.getAll.bind(this) }} />} />
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
                {/* <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button> */}
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
