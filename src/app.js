const express = require('express');
const app = express();
const router = require('./routes/router');
const middlewareLogRequest = require('./middleware/logs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(middlewareLogRequest);

app.use(router);

app.use('/assets', express.static('public/images'))

app.use((err, req, res, next) => {
    console.error('GLOBAL ERROR:', err); // supaya log keluar ke Railway
    res.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error',
        error: err.message || err
    });
});


module.exports = app