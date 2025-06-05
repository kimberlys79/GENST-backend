const router = require('express').Router();
const notificationController = require('../controller/notification');

router.post('/add', notificationController.createNewNotification);
router.get('/', notificationController.getAllNotification);
router.get('/:id', notificationController.getNotificationDetail);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;