const { createUser } = require('../controllers/user-controller')

module.exports = {
  Query: {
    me: () => ({}),
  },
  Mutation: {
    login: () => ({}),
    addUser: (_, body) => {
      return createUser(body)
    },
    saveBook: () => ({}),
    removeBook: () => ({}),
  },
};
