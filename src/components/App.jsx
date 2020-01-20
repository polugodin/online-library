import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Link, Redirect, useParams } from 'react-router-dom';
import { getBooksAction, getBookByIdAction } from '../actions';
import { getBooks, getBookById } from '../handlers';

import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="app__content">
        <header className="app__header">
          <h1 className="app__title">Онлайн-библиотека&nbsp;📕</h1>
        </header>

        <main className="app__main">
          <Switch>
            <Route path="/books">
              <Books />
            </Route>

            <Route path="/book/:id">
              <Book />
            </Route>

            <Redirect to="/books" />
          </Switch>
        </main>
      </div>
    </div>
  );
};

const Books = () => {
  const dispatch = useDispatch();
  const books = useSelector(state => state.books);

  useEffect(() => {
    getBooks().then(({ data }) => {
      dispatch(getBooksAction(data));
    });
  }, []);

  const booksSelector = booksObj => {
    return Object.keys(booksObj).map(commentKey => booksObj[commentKey]);
  };

  return (
    <>
      {Object.keys(books).length ? (
        <div className="books">
          {booksSelector(books).map(({ id, title }) => (
            <Link key={id} to={`/book/${id}`} className="book-link books__book-link">
              <h2 className="book-link__title">{title}</h2>
            </Link>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

const Book = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const book = useSelector(state => state.books[id]);

  useEffect(() => {
    getBookById(id).then(({ data }) => {
      dispatch(getBookByIdAction(data));
    });
  }, []);

  return (
    <>
      <Link to="/books" className="books-link">
        &#8672; Список книг
      </Link>
      {book ? (
        <div className="book">
          <h2 className="book__title">{book.title}</h2>
          <a className="book__read-link" href="#">
            Читать &#8674;
          </a>
          {book.description ? <p className="book__description">{book.description}</p> : <Loading />}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

const Loading = () => {
  return <div className="loading">Загрузка...</div>;
};

export default App;
