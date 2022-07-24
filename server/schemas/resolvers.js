const {
  createUser,
  login,
  getSingleUser,
  saveBook,
  deleteBook
} = require('../controllers/user-controller')

module.exports = {
  Query: {
    me: (parent, args, ctx) => {
      return getSingleUser(ctx.user)
    },
  },
  Mutation: {
    login: (_, body) => {
        return login (body)
    },
    addUser: (_, body) => {
      return createUser(body)
    },
    saveBook: (parent, args, ctx) => {
        return saveBook(ctx.user, args)
    },
    removeBook: (parent, args, ctx) => {
      return deleteBook( ctx.user, args )
    },
  },
};
