import Axios from 'axios';

const getBooks = () => Axios.get('/api/books');

const getBookById = id => Axios.get(`/api/book/${id}`, { params: { id } });

export { getBooks, getBookById };
