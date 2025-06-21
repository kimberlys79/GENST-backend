const express = require('express');
const router = express.Router();
const reportController = require('../controller/report');
const upload = require('../middleware/multer');

router.post(
    '/add',
    upload.middleware,
    reportController.createNewReport
);
  
router.get('/', reportController.getAllReport);
router.get('/:id', reportController.getReportDetail);

module.exports = router