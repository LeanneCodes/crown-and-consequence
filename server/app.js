const express = require('express');
const cors = require('cors');
const path = require('path')
const authRouter = require('./routers/authRoutes');
const storyRouter = require('./routers/storyRoutes');
const characterRouter = require('./routers/characterRoutes');
const sceneRouter = require('./routers/sceneRoutes');
const progressRouter = require('./routers/progressRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")))

// app.use('/auth', authRouter);                                               // signup, login
app.use('/stories', storyRouter);                                           // list stories
app.use('/stories/:storyId/characters', characterRouter);                   // characters per story
// app.use('/stories/:storyId/characters/:characterId/scenes', sceneRouter);   // get scene content
// app.use('/progress', progressRouter);                                       // answer submission, resume game play

module.exports = app