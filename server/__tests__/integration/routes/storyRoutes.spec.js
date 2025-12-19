const request = require('supertest');
const app = require('../../../app');
const { resetTestDB } = require('../config');

describe('Story API Endpoints', () => {
  let api;

  beforeEach(async () => {
    await resetTestDB("reset.all.sql");
  });

  beforeAll(() => {
    api = app.listen(4002, () => {
      console.log('Story test server running on port 4002');
    });
  });

  afterAll((done) => {
    console.log('Gracefully closing story test server');
    api.close(done);
  });

  describe('GET /api/stories', () => {
    it('should return all stories with status 200', async () => {
      const response = await request(api).get('/api/stories');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);

      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('title');
    });
  });
});
