const mongoose = require('mongoose');
const { hashSync, genSaltSync } = require('bcrypt');

/**
 * @class User
 * @property password
 */
const schema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false // by default not visible in queries
    }
  },
  { timestamps: true }
);

schema.pre('save', function (next) {
  this.password = hashSync(this.password, genSaltSync());
  next();
});

module.exports = mongoose.model('User', schema);
