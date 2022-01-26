class User {
  constructor(id, { firstName, lastName, age, createdAt, updatedAt }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  update({ firstName, lastName, age }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    return this;
  }
}

export default User;
