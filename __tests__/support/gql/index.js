const { graphql, buildSchema } = require('graphql');
const User = require('../user');

class AuthenticationError extends Error {
  constructor(message, extensions) {
    super(message);
    this.extensions = extensions;
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

  type Token{
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
    login(authProfileUuid: String, username: String, password: String): Token
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
    let output;

    if (username === 'test@test.test' && password === 'test123') {
      output = {
        jwtToken: 'my-awesome-token',
      };
    } else {
      throw new AuthenticationError('Wrong credentials, please try again', {
        statusCode: 401,
      });
    }
    return output;
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
