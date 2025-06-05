const router = require('express').Router();

const generatorRoutes = require('./generator');
const userRoutes = require('./user');
const notificationRoutes = require('./notification');
const reportRoutes = require('./report');

// Root Route
router.get('/', (req, res) => {
    res.send("Welcome to Genset Inspection System API");
});

const reportController = require('../controller/report'); // Route untuk POST /add router.post('/add', reportController.createNewReport);
router.post('/add', reportController.createNewReport);

// Modular Routes
router.use('/generator', generatorRoutes);
router.use('/user', userRoutes);
router.use('/report', reportRoutes);
router.use('/notification', notificationRoutes);

module.exports = router;
