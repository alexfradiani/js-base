const connection = require('../src/database/connection');

beforeAll((done) => {
  connection.create(done);
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

jest.setTimeout(30000);
