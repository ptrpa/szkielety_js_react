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
    <div className="container" style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Rejestracja</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Hasło:</label>
          <input
            name="password"
            type="password"
            placeholder="Hasło"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-link">Zarejestruj się</button>
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </form>
    </div>
  )
}
