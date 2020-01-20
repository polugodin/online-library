import { APP_ACTIONS } from './constants';

const initialState = {
  books: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_ACTIONS.GET_BOOKS: {
      const books = Object.assign({}, state.books);
      action.books.forEach(book => {
        if (books[book.id]) {
          for (let key in book) {
            books[book.id][key] = book[key];
          }
        } else books[book.id] = book;
      });
      return { ...state, books };
    }

    case APP_ACTIONS.GET_BOOK_BY_ID: {
      const books = Object.assign({}, state.books);
      books[action.book.id] = action.book;
      return { ...state, books };
    }

    default:
      return state;
  }
};

export default reducer;
