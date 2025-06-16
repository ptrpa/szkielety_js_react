import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllModelsForAdmin, deleteModel } from '../api/models'

export default function AdminModelsPage() {
  const [models, setModels] = useState([])
  const [error, setError] = useState(null)

  const fetchModels = async () => {
    try {
      const data = await getAllModelsForAdmin()
      setModels(data)
    } catch (err) {
      setError('Nie udało się pobrać modeli')
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
      setError('Nie udało się usunąć modelu')
    }
  }

  return (
    <div className="container" style={{ maxWidth: '900px', margin: '2rem auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/dashboard" className="btn-link">⬅ Powrót do dashboardu</Link>
      </div>

      <h2>📦 Zarządzanie modelami</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {models.length === 0 ? (
        <p>Brak modeli w systemie</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
          {models.map((model) => (
            <li key={model._id} className="card" style={{ padding: '1rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
              <strong>{model.name}</strong> — {model.description}
              <div style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>
                👤 Właściciel: <em>{model.userId?.email || 'Nieznany'}</em>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
