const express = require('express');
const { compareSync } = require('bcrypt');
const User = require('../database/entities/user.entity');
const auth = require('../middlewares/auth.middleware');
const { ApiError } = require('../middlewares/error.middleware');

class AuthController {
  routes() {
    const router = express.Router();

    router.post('/signup', this.signup.bind(this));
    router.post('/signin', this.signin.bind(this));

    return router;
  }

  async signup(req, res, next) {
    let user = null;
    try {
      user = new User(req.body.user);
      await user.save();
      user = user.toObject();
      delete user.password;
      res.send(user);
    } catch (err) {
      this.signupErrors(err, next);
    }
  }

  signupErrors(err, next) {
    if (err.code === 11000 && err.keyValue.email) {
      return next(new ApiError(400, Errors.DuplicatedEmail));
    }

    if (err.name === 'ValidationError') {
      return next(new ApiError(400, Errors.ValidationError));
    }

    next(err); // any other error
  }

  async signin(req, res, next) {
    const { email, password } = req.body.user;
    const user = await User.findOne({ email }).select('+password').exec();
    const match = user && compareSync(password, user.password);
    if (match) {
      const token = auth.createJWT(user);
      return res.send({ token });
    }

    next(new ApiError(401, Errors.InvalidCredentials));
  }
}

// possible errors from this controller:
const Errors = {
  DuplicatedEmail: 'DuplicatedEmail',
  InvalidCredentials: 'InvalidCredentials',
  ValidationError: 'ValidationError' // other mongoose errors
};

module.exports = { AuthController, Errors };
