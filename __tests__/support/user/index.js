class User {
  constructor(
    id,
    { firstName, lastName, age, createdAt, updatedAt, username, password },
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.username = username;
    this.password = password;
  }

  update({ firstName, lastName, age }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    return this;
  }
}

export default User;
