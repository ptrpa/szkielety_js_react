// src/pages/HomePage.js
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function HomePage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Witaj w aplikacji modeli dynamicznych</h1>
      <p>
        Twórz, edytuj i analizuj modele układów dynamicznych. Użytkownicy mogą
        zarządzać własnymi modelami, a administratorzy dodatkowo nadzorować pracę systemu.
      </p>

      {user ? (
        <>
          <p>Zalogowany jako: <strong>{user.role}</strong></p>
          <button onClick={() => navigate('/dashboard')}>
            Przejdź do panelu użytkownika
          </button>
        </>
      ) : (
        <p>Nie jesteś zalogowany. Użyj opcji powyżej, aby się zalogować lub zarejestrować.</p>
      )}
    </div>
  )
}
