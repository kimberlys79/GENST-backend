const express = require('express');
const app = express();
const router = require('./routes/router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const middlewareLogRequest = require('./middleware/logs');
app.use(middlewareLogRequest);

app.use('/assets', express.static('public/images'))

module.exports = app