const { graphql, buildSchema } = require('graphql');
const User = require('../user');

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.extensions = {
      statusCode: 401,
    };
  }
}
const userDatabase = {
  1: {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
  },
};

const schema = buildSchema(`
  type User {
    id: Int!
    firstName: String
    lastName: String
    age: Int
    createdAt: String
    updatedAt: String
  }

  type Token {
    jwtToken: String
  }

  input UserInput {
    firstName: String
    lastName: String
    age: Int
    createdAt: String
    updatedAt: String
  }

  input IdEquals {
    eq: Int!
  }

  input UserFilterInput {
    id: IdEquals!
  }

  type Query {
    oneUser(where: UserFilterInput): User
  }

  type Mutation {
    createUser(input: UserInput): User
    login(authProfileUuid: String!, username: String!, password: String!): Token
  }
`);

const root = {
  oneUser({
    where: {
      id: { eq: id },
    },
  }) {
    return userDatabase[id];
  },
  createUser({ input }) {
    const id = Math.floor((Math.random() + 1) * 100);

    userDatabase[id] = new User(id, input);

    return {
      id,
    };
  },
  login({ username, password }) {
    if (username === 'test@test.test' && password === 'test123') {
      return {
        jwtToken: 'my-awesome-token',
      };
    }

    throw new AuthenticationError('Wrong credentials, please try again');
  },
};

const gql = async (query, input) =>
  graphql({
    schema,
    source: query,
    rootValue: root,
    variableValues: input,
  });

module.exports = gql;
