const { Router } = require('express');
const storyController = require('../controllers/storyController')

const storyRouter = Router();

storyRouter.get("/", storyController.index);

module.exports = storyRouter;