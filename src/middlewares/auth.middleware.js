const { ApiError } = require('./error.middleware');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, ACCESS_TOKEN_LIFE } = require('../config/globals');

class AuthMiddleware {
  async check(req, _res, next) {
    let token = req.header('authorization');

    if (!token) {
      return next(new ApiError(401, 'Unauthorized'));
    }

    try {
      const payload = await this.verifyJWT(token);
      if (payload !== null) {
        req.session = payload;
        return next(); // there is a valid user
      }
    } catch (error) {
      next(new ApiError(401, 'Unauthorized'));
    }
  }

  async createJWT(user) {
    return new Promise((resolve, reject) => {
      try {
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          JWT_SECRET,
          { expiresIn: ACCESS_TOKEN_LIFE }
        );
        resolve(token);
      } catch (error) {
        console.log(error);
        reject();
      }
    });
  }

  async verifyJWT(token) {
    return new Promise((resolve, reject) => {
      try {
        const verify = jwt.verify(token, JWT_SECRET || '');
        resolve(verify);
      } catch (error) {
        reject();
      }
    });
  }
}

module.exports = new AuthMiddleware();
