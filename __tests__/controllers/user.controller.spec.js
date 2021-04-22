const request = require('supertest');
const app = require('../../src/app');
const seeds = require('../../src/database/seeds/users.seed');

describe("getting a user's profile", () => {
  it('returns unauthorized (401) with invalid session', async () => {
    let response = await request(app).get('/users/profile').send();
    expect(response.status).toBe(401);

    response = await request(app)
      .get('/users/profile')
      .set({ Authorization: 'hacked!' });
    expect(response.status).toBe(401);
  });

  it('returns profile data with valid session', async () => {
    let email = 'test@test.com',
      password = 'some-password';
    await seeds.one({ email, password });
    reqbody = { user: { email, password } };

    // a valid sign in
    let response = await request(app).post('/auth/signin').send(reqbody);
    const token = response.body.token;

    response = await request(app)
      .get('/users/profile')
      .set({ Authorization: token });
    expect(response.body.user).toBeDefined();
  });
});
