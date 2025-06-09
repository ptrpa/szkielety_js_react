// src/components/Navbar.js
import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav>
      <Link to="/">Strona główna</Link>
      {user ? (
        <>
          <button onClick={logout}>Wyloguj</button>
        </>
      ) : (
        <Link to="/login">Zaloguj się</Link>
      )}
    </nav>
  )
}
