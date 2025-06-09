const express = require('express');
const app = express();
const router = require('./routes/router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const middlewareLogRequest = require('./middleware/logs');
app.use(middlewareLogRequest);

app.use(router);

app.use('/assets', express.static('public/images'))

module.exports = app