const express = require('express');
const multer = require('multer');
const app = express();

const router = require('./routes/router');
const userRoutes = require('./routes/user');
const middlewareLogRequest = require('./middleware/logs');
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middlewareLogRequest);

app.use('/assets', express.static('public/images'))

app.use(router);
app.use('/user', userRoutes);
app.use('/users', userRoutes);

app.post('/upload', upload.single('photo'), (req, res) => {
    res.json({
        message: 'Upload berhasil'
    });
});

app.post('/add', async (req, res) => {
    try {
        const result = await createNewReport(req.body);
        res.status(201).send('Data diterima');
    } catch (error) {
        console.error(error);
        res.status(500).send({ statusCode: 500, message: 'Server Error', error });
    }
});

app.use((err, req, res, next) => {
    res.json({
        message: err.message
    });
});

module.exports = app