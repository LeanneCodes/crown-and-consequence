const { Router } = require('express');
const authController = require('../controllers/authController');

const authRouter = Router();

authRouter.post('/signup', authController.signup);  // directs users to the signup page
authRouter.post('/login', authController.login);    // directs users to the login page

module.exports = authRouter;
