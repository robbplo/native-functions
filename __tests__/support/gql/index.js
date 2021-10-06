import { graphql, buildSchema } from 'graphql';
import User from '../user';

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
    username: 'test@test.test',
    password: 'test1234',
  },
};

const loginUser = (username, password) =>
  !!Object.values(userDatabase).find(
    (user) => user.username === username && user.password === password,
  );

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
    generateJwt(authProfileUuid: String!, userId: Int, username: String, password: String): Token
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
  generateJwt({ authProfileUuid, userId, username, password }) {
    if (authProfileUuid === 'username-password-profile-id') {
      if (loginUser(username, password)) {
        return {
          jwtToken: 'my-awesome-token',
        };
      }
    } else if (authProfileUuid === 'custom-authentication-profile-id') {
      if (userDatabase[userId]) {
        return {
          jwtToken: 'my-awesome-token',
        };
      }
    } else {
      throw new Error('Unknown authentication profile');
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

export default gql;
