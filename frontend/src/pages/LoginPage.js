// src/pages/LoginPage.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/auth'
import useAuth from '../hooks/useAuth'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const token = await loginUser(form)
      login(token)
      //navigate('/')
      navigate('/dashboard')
    } catch (err) {
      setError('Nieprawidłowy login lub hasło')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Logowanie</h2>
      <input name="email" placeholder="E-mail" onChange={handleChange} />
      <input name="password" type="password" placeholder="Hasło" onChange={handleChange} />
      <button type="submit">Zaloguj</button>
      {error && <p>{error}</p>}
    </form>
  )
}
