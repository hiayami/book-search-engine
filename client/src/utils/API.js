import { client } from '../App'
import { CREATE_USER, LOGIN } from './mutations'

export const createUser = (userData) => {
  return client.mutate({
    mutation: CREATE_USER,
    variables: userData
  })
};

export const loginUser = (userData) => {
  return client.mutate({
    mutation: LOGIN,
    variables: userData,
  })
};

// remove saved book data for a logged in user
export const deleteBook = (bookId, token) => {
  return fetch(`/api/users/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
