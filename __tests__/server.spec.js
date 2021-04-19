const request = require('supertest');
const app = require('../src/app');
const { RATE_LIMIT_MAX_REQUESTS } = require('../src/config/globals');

describe('calling multiple times an endpoint', () => {
  it('returns http code 429: too many requests', async () => {
    let response;
    for (let index = 0; index < RATE_LIMIT_MAX_REQUESTS + 1; index++) {
      response = await request(app).post('/auth/signup');
    }
    expect(response.status).toBe(429);
  });
});
