const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const requireAdmin = require('../middleware/requireAdmin')
const {
  getAllUsers,
  updateUser,
  deleteUser
} = require('../controllers/adminController')

router.use(auth, requireAdmin)

router.get('/users', getAllUsers)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

module.exports = router
