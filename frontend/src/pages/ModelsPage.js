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
      fetchModels() // odśwież listę
    } catch (err) {
      setError('Błąd podczas usuwania modelu')
    }
  }

  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <h2>Twoje modele</h2>
      {models.length === 0 ? (
        <p>Brak modeli</p>
      ) : (
        <ul>
          {models.map((model) => (
            <li key={model._id}>
              <strong>{model.name}</strong> – {model.description}
              <div>
                <Link to={`/models/${model._id}`}>🔍 Podgląd</Link>{' '}
                | <Link to={`/models/${model._id}/edit`}>✏ Edytuj</Link>{' '}
                | <button onClick={() => handleDelete(model._id)}>🗑 Usuń</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div style={{ marginTop: '1em' }}>
        <Link to="/dashboard">⬅ Powrót do panelu</Link>
      </div>
    </div>
  )
}
