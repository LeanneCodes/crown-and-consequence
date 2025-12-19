const request = require('supertest');
const app = require('../../../app');
const { resetTestDB } = require('../config');

describe('Auth API Endpoints', () => {
  let api;

  beforeEach(async () => {
    await resetTestDB("reset.all.sql");
  });

  beforeAll((done) => {
    api = app.listen(4001, () => {
      console.log('Auth test server running on port 4001');
      done(); // tells Jest the server is ready
    });
  });

  afterAll((done) => {
    console.log('Gracefully closing auth test server');
    api.close(done); // tells Jest the server is closed
  });

  // POST /signup
  describe('POST /signup', () => {
    it('should create a new user and return status 201', async () => {
      const newUser = {
        username: "testuserUnique",
        email: "testUnique@example.com",
        password: "abc123"
      };

      const response = await request(api)
        .post('/api/auth/signup')
        .send(newUser);
      console.log(response.body);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('username', 'testuserUnique');
      expect(response.body).toHaveProperty('email', 'testUnique@example.com');
    });

    it('should fail if missing required fields', async () => {
      const badUser = { username: "test" };

      const response = await request(api)
        .post('/api/auth/signup')
        .send(badUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  // POST /login
  describe('POST /login', () => {
    it('should authenticate a valid user and return a token', async () => {
      // create account first
      await request(api).post('/api/auth/signup')
        .send({
          username: "testuser",
          email: "test@example.com",
          password: "abc123"
        });

      const response = await request(api)
        .post('/api/auth/login')
        .send({
          email: "test@example.com",
          password: "abc123"
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('token');
    });

    it('should reject invalid login', async () => {
      const response = await request(api)
        .post('/api/auth/login')
        .send({
          email: "unknown@example.com",
          password: "abc123"
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });

  // DELETE /me
  describe('DELETE /me', () => {
    it('should delete a logged-in user account', async () => {
      // create user
      await request(api).post('/api/auth/signup')
        .send({
          username: "deaduser",
          email: "dead@example.com",
          password: "abc123"
        });

      const response = await request(api)
        .delete('/api/auth/me')
        .send({
          email: "dead@example.com",
          password: "abc123"
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', "Account Deleted");
    });

    it('should reject deletion of unknown user', async () => {
      const response = await request(api)
        .delete('/api/auth/me')
        .send({
          email: "doesnotexist@example.com",
          password: "abc123"
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });

  // PATCH /update-password
  describe('PATCH /update-password', () => {
    it('should fail because this endpoint is not properly implemented yet', async () => {
      const response = await request(api)
        .patch('/api/auth/update-password')
        .send({});

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });

});
