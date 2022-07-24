const {gql} = require('apollo-server-express')

module.exports = gql`
  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  type Auth {
    token: String
    user: User
  }
  type User {
    _id: String
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String, password: String): Auth
    addUser(username: String, email: String, password: String): Auth
    saveBook(authors: [String], description: String, title: String, bookId: String, image: String, link: String): User
    removeBook(bookId: String): User 
  }
`
