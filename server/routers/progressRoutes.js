// const { Router } = require('express');
// const progressController = require('../controllers/progressController');

// const router = Router();

// /*
//   POST /

//   Purpose:
//   - Create a new progress record when a user starts a story

//   Example:
//   POST /progress

//   Body:
//   {
//     "userId": 1,
//     "storyId": 2,
//     "characterId": 5
//   }
// */
// router.post('/', progressController.create);

// /*
//   GET /:userId/:storyId

//   Purpose:
//   - Retrieve a user's current progress for a specific story
//   - Used when the user logs back in or refreshes the page

//   Example:
//   GET /progress/1/2
// */
// router.get('/:userId/:storyId', progressController.getByUserAndStory);

// /*
//   PATCH /:userId/:storyId

//   Purpose:
//   - Update progress as the user advances through scenes

//   Example:
//   PATCH /progress/1/2

//   Body:
//   {
//     "currentScene": 3,
//     "score": 10,
//     "completed": false
//   }
// */
// router.patch('/:userId/:storyId', progressController.update);

// module.exports = router;
