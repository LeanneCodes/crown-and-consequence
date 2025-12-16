const { Router } = require('express');
const sceneController = require('../controllers/sceneController');

/*
  This router handles all "scene" related actions.
  It is a nested router, mounted under:

  /stories/:storyId/characters/:characterId/scenes

  mergeParams: true is required so that:
  - storyId
  - characterId
  are accessible inside the scene controller via req.params
*/
const router = Router({ mergeParams: true });

/*
  GET /:sceneOrder

  Purpose:
  - Fetch and display a specific scene in the story sequence
  - Used when the user FIRST arrives at a scene or moves to the next one

  Example request:
  GET /stories/1/characters/2/scenes/1

  What this does:
  - Uses characterId + sceneOrder to retrieve the correct scene
  - Returns the story text, question, and answer options
  - DOES NOT change any data or affect scoring
*/
router.get('/:order', sceneController.getSceneByOrder);

module.exports = router;
