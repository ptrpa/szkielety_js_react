const SystemModel = require('../models/SystemModel')
const { validateModelInput } = require('../utils/modelValidator')

// POST /api/models
async function createModel(req, res) {
  try {
    validateModelInput(req.body)

    const model = new SystemModel({
      ...req.body,
      userId: req.user.id
    })
    const saved = await model.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// GET /api/models
async function getModels(req, res) {
  try {
    const filter = req.user.role === 'admin'
      ? {}
      : { userId: req.user.id }

    const models = await SystemModel.find(filter).populate('userId', 'email')
    res.json(models)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// GET /api/models/:id
async function getModelById(req, res) {
  try {
    const model = await SystemModel.findById(req.params.id)
    if (!model) return res.status(404).json({ error: 'Model nie istnieje' })

    if (
      req.user.role !== 'admin' &&
      model.userId.toString() !== req.user.id
    ) {
      return res.status(403).json({ error: 'Brak dostępu do tego modelu' })
    }

    res.json(model)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// PUT /api/models/:id
async function updateModel(req, res) {
  try {
    const model = await SystemModel.findById(req.params.id)
    if (!model) return res.status(404).json({ error: 'Model nie istnieje' })

    const isOwner = model.userId.toString() === req.user.id
    const isAdmin = req.user.role === 'admin'

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'Brak uprawnień do edycji' })
    }

    if (!model.editable && !isAdmin) {
      return res.status(403).json({ error: 'Model nie jest edytowalny' })
    }

    validateModelInput(req.body)
    Object.assign(model, req.body)
    if (isAdmin) model.modifiedByAdmin = true

    const updated = await model.save()
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// DELETE /api/models/:id
async function deleteModel(req, res) {
  try {
    const model = await SystemModel.findById(req.params.id)
    if (!model) return res.status(404).json({ error: 'Model nie istnieje' })

    const isOwner = model.userId.toString() === req.user.id
    const isAdmin = req.user.role === 'admin'

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'Brak uprawnień do usunięcia' })
    }

    await model.deleteOne()
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// GET /api/admin/models
async function getAllModels(req, res) {
  try {
    const models = await SystemModel.find().populate('userId', 'email')
    res.json(models)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  createModel,
  getModels,
  getModelById,
  updateModel,
  deleteModel,
  getAllModels
}
