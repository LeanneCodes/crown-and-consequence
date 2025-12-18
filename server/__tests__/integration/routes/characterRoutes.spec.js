const request = require('supertest');
const app = require('../../../app');
const { resetTestDB } = require('../config');

describe('Character API Endpoints', () => {
  let api;

  beforeEach(async () => {
    await resetTestDB("reset.all.sql");
  });

  beforeAll(() => {
    api = app.listen(4003, () => {
      console.log('Character test server running on port 4003');
    });
  });

  afterAll((done) => {
    console.log('Gracefully closing character test server');
    api.close(done);
  });

  describe('GET /api/stories/:storyId/characters', () => {
    it('should return all characters for a story with status 200', async () => {

      // ACT
      const response = await request(api).get('/api/stories/1/characters');

      // ASSERT
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);

      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('storyId', 1);
    });
  });

  describe('GET /api/stories/:storyId/characters/:id', () => {
    it('should return a single character with status 200', async () => {

      // ACT
      const response = await request(api)
        .get('/api/stories/1/characters/1');

      // ASSERT
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);

      expect(response.body[0]).toHaveProperty('id', 1);
      expect(response.body[0]).toHaveProperty('storyId', 1);
      expect(response.body[0]).toHaveProperty('name');
    });
  });
});
