// src/pages/DashboardPage.js
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { getAllModels } from '../api/models'

export default function DashboardPage() {
  const { user } = useAuth()
  const [models, setModels] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await getAllModels()
        setModels(data)
      } catch (err) {
        setError(err.message)
      }
    }

    if (user) fetchModels()
  }, [user])

  if (!user) return <p>Ładowanie...</p>

  return (
    <div>
      <h2>Witaj, {user.email}</h2>

      <p>Masz {models.length} modeli.</p>

      {models.length > 0 && (
        <p>Ostatni model: <strong>{models[models.length - 1].name}</strong></p>
      )}

      <div style={{ marginTop: '1em' }}>
        <Link to="/models">📂 Przeglądaj modele</Link><br />
        <Link to="/models/new">➕ Utwórz nowy model</Link><br />
        <Link to="/settings">⚙ Ustawienia</Link><br />
        {user.role === 'admin' && (
          <Link to="/admin">🛠 Panel administratora</Link>
        )}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
