const router = required('express').Router();

const generatorRoutes = required('./generator');
const userRoutes = required('./user');
const notificationRoutes = required('./notification');
const reportRoutes = required('./report');

// Root Route
router.get('/', (req, res) => {
    res.send("Welcome to Genset Inspection System API");
});

const reportController = required('../controller/report'); // Route untuk POST /add router.post('/add', reportController.createNewReport);
router.post('/add', reportController.createNewReport);

// Modular Routes
router.use('/generator', generatorRoutes);
router.use('/user', userRoutes);
router.use('/report', reportRoutes);
router.use('/notification', notificationRoutes);

module.exports = router
