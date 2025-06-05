const UserController = require('../controller/user.js');

const router = require('express').Router();

const { authentication } = require('../middleware/auth')

router.post('/add', UserController.createNewUser);
router.post('/login', UserController.loginUser);
router.get('/', UserController.getAllUser);
router.get('/:id', UserController.getUserDetail);
router.patch('/:id', authentication, UserController.updateUser);
router.delete('/:id', authentication, UserController.deleteUser);

module.exports = router;