const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const requireAdmin = require('../middleware/requireAdmin')
const {
  getAllUsers,
  updateUser,
  deleteUser
} = require('../controllers/adminController')

const {
  getAllModels
} = require('../controllers/modelController')

router.use(auth, requireAdmin)

router.get('/users', getAllUsers)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

router.get('/models', getAllModels)

module.exports = router
