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
    <div>
      <h2>Witaj, {user.email}</h2>

      {user.role === 'admin' ? (
        <>
          <p>🔐 Masz uprawnienia administratora</p>
          <p>👥 Liczba użytkowników: <strong>{users.length}</strong></p>
          <p>📦 Liczba wszystkich modeli: <strong>{models.length}</strong></p>

          <div style={{ marginTop: '1em' }}>
            <Link to="/admin/users">👥 Zarządzaj użytkownikami</Link><br />
            <Link to="/admin/models">📦 Zarządzaj modelami</Link><br />
            <Link to="/settings">⚙ Ustawienia</Link>
          </div>
        </>
      ) : (
        <>
          <p>Masz {models.length} modeli.</p>
          {models.length > 0 && (
            <p>Ostatni model: <strong>{models[models.length - 1].name}</strong></p>
          )}

          <div style={{ marginTop: '1em' }}>
            <Link to="/models">📂 Przeglądaj modele</Link><br />
            <Link to="/models/new">➕ Utwórz nowy model</Link><br />
            <Link to="/settings">⚙ Ustawienia</Link>
          </div>
        </>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
