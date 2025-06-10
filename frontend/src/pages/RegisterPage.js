// src/pages/RegisterPage.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../api/auth'
import useAuth from '../hooks/useAuth'

export default function RegisterPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const token = await registerUser(form)
      login(token)
      navigate('/')
    } catch (err) {
      setError('Nie udało się zarejestrować')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Rejestracja</h2>
      <input
        name="email"
        type="email"
        placeholder="E-mail"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Hasło"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Zarejestruj się</button>
      {error && <p>{error}</p>}
    </form>
  )
}
