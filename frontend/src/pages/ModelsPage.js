// src/pages/ModelsPage.js
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllModels, deleteModel } from '../api/models'

export default function ModelsPage() {
  const [models, setModels] = useState([])
  const [error, setError] = useState(null)

  const fetchModels = async () => {
    try {
      const data = await getAllModels()
      setModels(data)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchModels()
  }, [])

  const handleDelete = async (id) => {
    const confirm = window.confirm('Czy na pewno chcesz usunąć ten model?')
    if (!confirm) return
    try {
      await deleteModel(id)
      fetchModels()
    } catch (err) {
      setError('Błąd podczas usuwania modelu')
    }
  }

  return (
    <div className="container" style={{ maxWidth: '900px', margin: '2rem auto' }}>
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Twoje modele</h2>
        <Link to="/dashboard" className="btn-link">⬅ Powrót do panelu</Link>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {models.length === 0 ? (
        <p>Brak modeli</p>
      ) : (
        <ul className="model-list" style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
          {models.map((model) => (
            <li key={model._id} className="model-item" style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>{model.name}</strong><br />
                <small>{model.description}</small>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to={`/models/${model._id}`} className="btn-link">🔍 Podgląd</Link>
                <Link to={`/models/${model._id}/edit`} className="btn-link">✏ Edytuj</Link>
                <button onClick={() => handleDelete(model._id)} className="btn-danger">🗑 Usuń</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
