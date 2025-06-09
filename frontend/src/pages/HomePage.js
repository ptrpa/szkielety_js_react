// src/pages/HomePage.js
import React from 'react'
import useAuth from '../hooks/useAuth'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div>
      <h1>Witaj w aplikacji modeli dynamicznych</h1>
      {user ? <p>Zalogowany jako: {user.role}</p> : <p>Nie jesteś zalogowany</p>}
    </div>
  )
}
