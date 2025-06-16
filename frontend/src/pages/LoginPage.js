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
      navigate('/dashboard')
    } catch (err) {
      setError('Nieprawidłowy login lub hasło')
    }
  }

  return (
    <div className="container" style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Logowanie</h2>

        <div className="form-group">
          <label>Email:</label>
          <input
            name="email"
            type="email"
            placeholder="E-mail"
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
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-link">Zaloguj</button>

        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </form>
    </div>
  )
}
