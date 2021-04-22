const request = require('supertest');
const app = require('../../src/app');
const { Errors: AuthErr } = require('../../src/controllers/auth.controller');
const UserFactory = require('../../src/database/factories/user.factory');
const userSeeds = require('../../src/database/seeds/users.seed');
const User = require('../../src/database/entities/user.entity');

describe('creating an account', () => {
  it('returns http code 200 whith valid params', async () => {
    const reqbody = { user: UserFactory.create() };
    const response = await request(app).post('/auth/signup').send(reqbody);
    expect(response.status).toBe(200);
  });

  it('returns appropriate errors when request data is invalid', async () => {
    const reqbody = {};
    const response = await request(app).post('/auth/signup').send(reqbody);
    expect(response.status).toBe(400);
    expect(response.body.type).toEqual(AuthErr.ValidationError);
  });

  it('returns duplicated email error', async () => {
    const email = 'repeated@email.com';
    await userSeeds.one({ email });
    const user = UserFactory.create();
    user.email = email;
    const reqbody = { user };
    const response = await request(app).post('/auth/signup').send(reqbody);
    expect(response.status).toBe(400);
    expect(response.body.type).toEqual(AuthErr.DuplicatedEmail);
  });

  it('returns code 500 with unhandled errors', async () => {
    jest.spyOn(User.prototype, 'constructor').mockImplementation(() => {
      return res.send(new Error('unhandled error'));
    });
    const response = await request(app).post('/auth/signup').send({});
    expect(response.status).toBe(500);
    jest.restoreAllMocks();
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
