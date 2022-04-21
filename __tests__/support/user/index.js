import City from '../city';

const cityDatabase = {
  1: new City(1, {
    name: 'Amsterdam',
  }),
  2: new City(2, {
    name: 'London',
  }),
};

class User {
  constructor(
    id,
    {
      firstName,
      lastName,
      age,
      createdAt,
      updatedAt,
      username,
      password,
      city,
    },
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.username = username;
    this.password = password;
    this.city = cityDatabase[city];
  }

  update({ firstName, lastName, age, city }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.city = cityDatabase[city] || this.city;
    return this;
  }
}

export default User;
