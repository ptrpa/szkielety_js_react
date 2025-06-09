const User = require('../models/User')

// GET /admin/users
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password')
  res.json(users)
}

// PUT /api/admin/users/:id
exports.updateUser = async (req, res) => {
  const { id } = req.params
  const { email, role } = req.body

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { email, role },
      { new: true, runValidators: true }
    ).select('-password')

    if (!user) return res.status(404).json({ error: 'Użytkownik nie znaleziony' })

    res.json(user)
  } catch (err) {
    res.status(400).json({ error: 'Nie można zaktualizować użytkownika' })
  }
}


// DELETE /api/admin/users/:id
exports.deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByIdAndDelete(id)
    if (!user) return res.status(404).json({ error: 'Użytkownik nie znaleziony' })

    res.status(204).send()
  } catch (err) {
    res.status(400).json({ error: 'Nie można usunąć użytkownika' })
  }
}
