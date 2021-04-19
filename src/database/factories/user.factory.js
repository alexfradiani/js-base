const faker = require('faker');
const User = require('../entities/user.entity');

class UserFactory {
  static create() {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const password = faker.internet.password(8);

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;

    return user;
  }
}

module.exports = UserFactory;
