const express = require('express');
const request = require('supertest');
const {
  ApiError,
  ErrorMiddleware
} = require('../../src/middlewares/error.middleware');
const { Errors: AuthErr } = require('../../src/controllers/auth.controller');

describe('error middleware', () => {
  it('throws ApiError and Internal Server Error accordingly', async () => {
    const app = express();
    app.get('/apierror', (_req, _res) => {
      throw new ApiError(400, AuthErr.ValidationError);
    });
    app.get('/internalerror', (_req, _res) => {
      throw new Error('weird-unhandled-error');
    });

    app.use((err, _req, res, _next) => {
      // check for the middleware
      ErrorMiddleware.handler(err, res);
    });

    let response = await request(app).get('/apierror');
    expect(response.body.type).toEqual(AuthErr.ValidationError);
    response = await request(app).get('/internalerror');
    expect(response.status).toEqual(500);
  });
});
