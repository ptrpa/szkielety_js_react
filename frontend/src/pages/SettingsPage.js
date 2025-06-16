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
    <div>
      <h2>🔐 Zmień hasło</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Obecne hasło:</label><br />
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Nowe hasło:</label><br />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Zmień hasło</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <div style={{ marginTop: '1em' }}>
        <Link to="/dashboard">⬅ Powrót do dashboardu</Link>
      </div>
    </div>
  )
}
