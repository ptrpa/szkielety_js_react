import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function HomePage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '2rem auto', textAlign: 'center' }}>
      <div className="card" style={{ padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          👋 Witaj w aplikacji modeli dynamicznych
        </h1>

        <p style={{ marginBottom: '1.5rem' }}>
          Twórz, edytuj i analizuj modele układów dynamicznych.
          Jako użytkownik możesz zarządzać swoimi modelami, a jako administrator – nadzorować cały system.
        </p>

        {user ? (
          <>
            <p style={{ marginBottom: '1rem' }}>
              Zalogowany jako: <strong>{user.role}</strong>
            </p>
            <button onClick={() => navigate('/dashboard')} className="btn-link">
              👉 Przejdź do panelu użytkownika
            </button>
          </>
        ) : (
          <>
            <p style={{ marginBottom: '1rem' }}>
              Nie jesteś zalogowany.
            </p>
            <p>
              <strong>Zaloguj się</strong> lub <strong>zarejestruj</strong>, używając opcji w górnym menu.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
