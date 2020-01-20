import { APP_ACTIONS } from './constants';

const getBooksAction = books => ({
  type: APP_ACTIONS.GET_BOOKS,
  books
});

const getBookByIdAction = book => ({
  type: APP_ACTIONS.GET_BOOK_BY_ID,
  book
});

export { getBooksAction, getBookByIdAction };
