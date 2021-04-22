const express = require('express');
const auth = require('../middlewares/auth.middleware');
const User = require('../database/entities/user.entity');

class UsersController {
  routes() {
    const router = express.Router();

    router.get('/profile', auth.check.bind(auth), this.profile.bind(this));

    return router;
  }

  async profile(req, res) {
    const user = await User.findOne({ id: req.session.userId });
    res.send({ user });
  }
}

module.exports = { UsersController };
