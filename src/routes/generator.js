const router = require('express').Router();
const generatorController = require('../controller/generator')

router.get('/', generatorController.getAllGenerator)

router.post('/add', generatorController.createNewGenerator)

router.get('/:id', generatorController.getGeneratorDetail)

router.patch('/:id', generatorController.updateGenerator)

//router.delete('/:id', generatorController.deleteGenerator)

module.exports = router
