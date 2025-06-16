const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { changePassword } = require('../controllers/authController')

const {
  register,
  login,
  getMe,
  updateMe,
  deleteMe
} = require('../controllers/authController')

router.post('/register', register)
router.post('/login', login)
router.get('/me', auth, getMe)
router.put('/me', auth, updateMe)
router.delete('/me', auth, deleteMe)
router.put('/me/password', auth, changePassword)



module.exports = router
