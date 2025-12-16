const { Router } = require('express');
const progressController = require('../controllers/progressController');

const router = Router();

router.post('/', progressController.create);

router.get(
  '/:userId/:storyId/:characterId',
  progressController.getByUserAndStory
);

router.patch(
  '/:userId/:storyId/:characterId',
  progressController.update
);

module.exports = router;
