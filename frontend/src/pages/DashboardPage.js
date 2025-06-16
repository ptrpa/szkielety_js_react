// src/pages/DashboardPage.js
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { getAllModels } from '../api/models'
import { getAllUsers } from '../api/admin'

export default function DashboardPage() {
  const { user } = useAuth()
  const [models, setModels] = useState([])
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) return

    const fetchData = async () => {
      try {
        const modelsData = await getAllModels()
        setModels(modelsData)

        if (user.role === 'admin') {
          const usersData = await getAllUsers()
          setUsers(usersData)
        }
      } catch (err) {
        setError(err.message)
      }
    }

    fetchData()
  }, [user])

  if (!user) return <p>Ładowanie...</p>

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <div className="card" style={{ padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '1rem' }}>Witaj, {user.email}</h2>

        {user.role === 'admin' ? (
          <>
            <p style={{ margin: '0.5rem 0' }}>🔐 Masz uprawnienia administratora</p>
            <p style={{ margin: '0.5rem 0' }}>👥 Liczba użytkowników: <strong>{users.length}</strong></p>
            <p style={{ margin: '0.5rem 0' }}>📦 Liczba modeli: <strong>{models.length}</strong></p>

            <div className="actions" style={{ marginTop: '1.5rem' }}>
              <Link to="/admin/users" className="btn-link">👥 Zarządzaj użytkownikami</Link><br />
              <Link to="/admin/models" className="btn-link">📦 Zarządzaj modelami</Link><br />
              <Link to="/settings" className="btn-link">⚙ Ustawienia</Link>
            </div>
          </>
        ) : (
          <>
            <p>Masz {models.length} modeli.</p>
            {models.length > 0 && (
              <p>Ostatni model: <strong>{models[models.length - 1].name}</strong></p>
            )}
            <div className="actions" style={{ marginTop: '1.5rem' }}>
              <Link to="/models" className="btn-link">📂 Przeglądaj modele</Link><br />
              <Link to="/models/new" className="btn-link">➕ Utwórz nowy model</Link><br />
              <Link to="/settings" className="btn-link">⚙ Ustawienia</Link>
            </div>
          </>
        )}

        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </div>
    </div>
  )
}
