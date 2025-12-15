const express = require('express');
const cors = require('cors');
const path = require('path')
const entryRouter = require('./routers/entries');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")))

app.use('/entries', entryRouter);

module.exports = app