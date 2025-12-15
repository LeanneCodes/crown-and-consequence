const { Router } = require('express');
const characterController = require('../controllers/characterController');

/*
  This router handles all "character" related actions.
  It is a nested router, mounted under:

  /stories/:storyId/characters

  mergeParams: true is required so that:
  - storyId
  is accessible inside the character controller via req.params
*/
const characterRouter = Router({ mergeParams: true });

characterRouter.get('/', characterController.index); // retrieves all the characters related to the selected story

module.exports = characterRouter;
