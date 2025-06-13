const router = require('express').Router()
const notificationController = require('../controller/notification')

router.get('/', notificationController.getAllNotification)
router.get('/:id', notificationController.getNotificationDetail)
router.delete('/:id', notificationController.deleteNotification)
router.post('/add', notificationController.createNewNotification)

module.exports = router;