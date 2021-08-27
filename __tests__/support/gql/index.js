const { graphql, buildSchema } = require('graphql');

class User {
  constructor(id, { firstName, lastName, age, createdAt, updatedAt }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

const userDatabase = {};

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
    return {
      id,
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    };
  },
  createUser({ input }) {
    const id = Math.floor((Math.random() + 1) * 100);

    userDatabase[id] = new User(id, input);

    return {
      id,
    };
  },
};

const gql = async (query, input) => {
  const result = await graphql({
    schema,
    source: query,
    rootValue: root,
    variableValues: input,
  });

  return result;
};

module.exports = gql;
