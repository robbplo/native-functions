const { graphql, buildSchema } = require('graphql');
const User = require('../user');

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
  }
`);

const root = {
  oneUser({
    where: {
      id: { eq: id },
    },
  }) {
    if (!userDatabase[id]) {
      throw new Error("Record doesn't exist");
    }

    return userDatabase[id];
  },
  createUser({ input }) {
    const id = Math.floor((Math.random() + 1) * 100);

    userDatabase[id] = new User(id, input);

    return {
      id,
    };
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
