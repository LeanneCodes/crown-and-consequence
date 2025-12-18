const request = require('supertest');
const app = require('../../../app');
const { resetTestDB } = require('../config');

describe('Scene API Endpoints', () => {
  let api;

  beforeEach(async () => {
    await resetTestDB("reset.all.sql");
  });

  beforeAll(() => {
    api = app.listen(4004, () => {
      console.log('Scene test server running on port 4004');
    });
  });

  afterAll((done) => {
    console.log('Gracefully closing scene test server');
    api.close(done);
  });

  describe(
    'GET /api/stories/:storyId/characters/:characterId/scenes/:order',
    () => {
      it('should return a scene with status 200', async () => {
        // ACT
        const response = await request(api)
          .get('/api/stories/1/characters/1/scenes/1');

        // ASSERT
        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('character_id', 1);
        expect(response.body).toHaveProperty('scene_order', 1);

        expect(response.body).toHaveProperty('narrative');
        expect(response.body).toHaveProperty('question');
        expect(response.body).toHaveProperty('option_a');
        expect(response.body).toHaveProperty('option_b');
      });

      it('should return 404 if the scene does not exist', async () => {
        // ACT
        const response = await request(api)
          .get('/api/stories/1/characters/1/scenes/99');

        // ASSERT
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
      });
    }
  );
});
