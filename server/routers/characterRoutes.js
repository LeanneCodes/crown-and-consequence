const { Router } = require('express');
const characterController = require('../controllers/characterController')

const characterRouter = Router();

characterRouter.get("/", characterController.index);

module.exports = characterRouter;