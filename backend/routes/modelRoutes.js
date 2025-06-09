const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const modelController = require('../controllers/modelController')

// Wszystkie trasy wymagają JWT
router.use(auth)

router.post('/', modelController.createModel)
router.get('/', modelController.getModels)
router.get('/:id', modelController.getModelById)
router.put('/:id', modelController.updateModel)
router.delete('/:id', modelController.deleteModel)

module.exports = router
