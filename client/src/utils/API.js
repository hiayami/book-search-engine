import { gql } from '@apollo/client'
import { client } from '../App'

export const CREATE_USER = gql`
  mutation addUser(
    $username: String
    $email: String
    $password: String
  ) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  }
`

export const LOGIN = gql`
  mutation login(
    $email: String
    $password: String
  ) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  }
`

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`

// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return client.query({
    query: GET_ME,
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  })
};

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

// save book data for a logged in user
export const saveBook = (bookData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
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
