const express = require('express');
const auth = require('../middlewares/auth.middleware');

class UsersController {
  static routes() {
    const router = express.Router();

    router.get('/profile', auth.check, this.profile);

    return router;
  }

  static profile(req, res) {
    console.log('profile was called...');
    res.send('WIP');
  }
}

module.exports = UsersController;
