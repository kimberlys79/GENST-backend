const express = require('express');
const app = express();
const router = require('./routes/router');
const middlewareLogRequest = require('./middleware/logs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(middlewareLogRequest);

app.use(router);

app.use('/assets', express.static('public/images'))

app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

module.exports = app