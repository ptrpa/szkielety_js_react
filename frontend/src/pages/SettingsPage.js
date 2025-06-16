import React, { useState } from 'react'
import { changePassword } from '../api/auth'
import { Link } from 'react-router-dom'

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      await changePassword(currentPassword, newPassword)
      setSuccess('Hasło zostało zmienione.')
      setCurrentPassword('')
      setNewPassword('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container" style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/dashboard" className="btn-link">⬅ Powrót do dashboardu</Link>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>🔐 Zmień hasło</h2>

        <div className="form-group">
          <label>Obecne hasło:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Nowe hasło:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-link">Zmień hasło</button>

        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: '1rem' }}>{success}</p>}
      </form>
    </div>
  )
}
