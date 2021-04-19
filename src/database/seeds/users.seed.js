const UserFactory = require('../factories/user.factory');

const one = async (fields = {}) => {
  const user = UserFactory.create();
  Object.assign(user, fields);
  await user.save();
};

module.exports = {
  one
};
