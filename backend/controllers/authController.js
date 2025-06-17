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

    const isValid = password.length >= 6 &&
      /[a-zA-Z]/.test(password) &&
      /\d/.test(password) &&
      !/\s/.test(password)

    if (!isValid) {
      return res.status(400).json({ error: "Hasło musi mieć min. 6 znaków, zawierać literę i cyfrę, bez spacji" })
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

// PUT /api/me/password
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body
  const user = await User.findById(req.user.id)

  if (!user || !(await user.comparePassword(currentPassword))) {
    return res.status(401).json({ error: "Błędne aktualne hasło" })
  }

  if (currentPassword === newPassword) {
    return res.status(400).json({ error: "Nowe hasło musi różnić się od obecnego" })
  }

  const isValid = newPassword.length >= 6 &&
    /[a-zA-Z]/.test(newPassword) &&
    /\d/.test(newPassword) &&
    !/\s/.test(newPassword)

  if (!isValid) {
    return res.status(400).json({ error: "Hasło musi mieć min. 6 znaków, zawierać literę i cyfrę, bez spacji" })
  }

  user.password = newPassword
  await user.save()

  res.json({ message: "Hasło zostało zmienione" })
}
