const User = require('../models/User')
const { generateToken } = require('../utils/token')

// POST /register
exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(409).json({ error: "Użytkownik już istnieje" })
    }

    const user = await User.create({ email, password })
    const token = generateToken(user)
    res.status(201).json({ token })
  } catch (err) {
    next(err)
  }
}

// POST /login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Nieprawidłowe dane logowania" })
    }

    const token = generateToken(user)
    res.json({ token })
  } catch (err) {
    next(err)
  }
}

// GET /me
exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')
  res.json(user)
}

// PUT /me
exports.updateMe = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true })
  res.json(updated)
}

// DELETE /me
exports.deleteMe = async (req, res) => {
  await User.findByIdAndDelete(req.user.id)
  res.status(204).send()
}
