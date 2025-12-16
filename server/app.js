const express = require('express');
const cors = require('cors');
const path = require('path');

const authRouter = require('./routers/authRoutes');
const storyRouter = require('./routers/storyRoutes');
const characterRouter = require('./routers/characterRoutes');
const sceneRouter = require('./routers/sceneRoutes');
const progressRouter = require('./routers/progressRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'signup.html'));
});

app.use('/api/auth', authRouter); 
app.use('/api/stories', storyRouter);
app.use('/api/progress', progressRouter);

app.use(
  '/api/stories/:storyId/characters',
  characterRouter
);

app.use(
  '/api/stories/:storyId/characters/:characterId/scenes',
  sceneRouter
);

module.exports = app;
