const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const UsersController = require('./controllers/users.controller');
const AuthController = require('./controllers/auth.controller');
const { ErrorMiddleware } = require('./middlewares/error.middleware');
const {
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW
} = require('./config/globals');

const app = express();
app.use(express.json());
// set up security headers
app.use(helmet());
// rate limiter middleware
app.use(
  rateLimit({
    windowMs: RATE_LIMIT_WINDOW,
    max: RATE_LIMIT_MAX_REQUESTS,
    message: {
      status: 429,
      message: 'Too many requests, please try again later.'
    }
  })
);

app.use('/users', UsersController.routes());

const authCtrl = new AuthController();
app.use('/auth', authCtrl.routes());

// generic error middleware handler
app.use((err, _req, res, _next) => {
  ErrorMiddleware.handler(err, res);
});

module.exports = app;
