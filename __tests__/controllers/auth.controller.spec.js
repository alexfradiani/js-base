const request = require('supertest');
const app = require('../../src/app');
const UserFactory = require('../../src/database/factories/user.factory');
const userSeeds = require('../../src/database/seeds/users.seed');

describe('creating an account', () => {
  it('returns http code 200 whith valid params', async () => {
    const reqbody = { user: UserFactory.create() };
    const response = await request(app).post('/auth/signup').send(reqbody);
    expect(response.status).toBe(200);
  });

  it('returns http code 400 whith invalid params', async () => {
    const reqbody = {};
    const response = await request(app).post('/auth/signup').send(reqbody);
    expect(response.status).toBe(400);
  });
});

describe('creating a session', () => {
  let email;
  let password;

  beforeEach(async () => {
    email = 'test@test.com';
    password = 'some-testing-password';
    await userSeeds.one({ email, password });
  });

  it('returns http code 200 whith valid params', async () => {
    const reqbody = { user: { email, password } };
    const response = await request(app).post('/auth/signin').send(reqbody);
    expect(response.status).toBe(200);
  });

  it('returns http code 401 whith invalid params', async () => {
    const reqbody = {
      user: { email: 'random@random.com', password: 'fake-password' }
    };
    const response = await request(app).post('/auth/signin').send(reqbody);
    expect(response.status).toBe(401);
  });
});
