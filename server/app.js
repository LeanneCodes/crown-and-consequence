const express = require('express');
const cors = require('cors');
const path = require('path')
const authRouter = require('./routers/authRoutes');
const characterRouter = require('./routers/characterRoutes');
const progressRouter = require('./routers/progressRoutes');
const storyRouter = require('./routers/storyRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")))

app.use('/auth', authRouter);
app.use('/character', characterRouter);
app.use('/progress', progressRouter);
app.use('/story', storyRouter);

module.exports = app