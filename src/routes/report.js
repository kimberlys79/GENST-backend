const express = require('express');
const router = express.Router();
const reportController = require('../controller/report');
const upload = require('../middleware/multer');

router.post(
    '/add',
    upload.fields([
      { name: 'upload_photo', maxCount: 1 },
      { name: 'inspector_sign', maxCount: 1 }
    ]),
    reportController.createNewReport
  );
  
router.get('/', reportController.getAllReport);
router.get('/:id', reportController.getReportDetail);

module.exports = router