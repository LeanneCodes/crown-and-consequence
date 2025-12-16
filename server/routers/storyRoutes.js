const { Router } = require('express');
const storyController = require('../controllers/storyController')

const storyRouter = Router();

storyRouter.get("/", storyController.index); // retrieves all the stories from the database

module.exports = storyRouter;