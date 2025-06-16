import React, { useEffect, useState } from 'react'
import { getAllUsers, updateUser, deleteUser } from '../api/admin'
import { Link } from 'react-router-dom'

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleChange = (id, field, value) => {
    setUsers(prev =>
      prev.map(u => (u._id === id ? { ...u, [field]: value } : u))
    )
  }

  const handleSave = async (id) => {
    const user = users.find(u => u._id === id)
    try {
      await updateUser(id, { email: user.email, role: user.role })
      fetchUsers()
    } catch (err) {
      setError('Nie udało się zapisać zmian')
    }
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm('Czy na pewno usunąć użytkownika?')
    if (!confirm) return
    try {
      await deleteUser(id)
      fetchUsers()
    } catch (err) {
      setError('Nie udało się usunąć użytkownika')
    }
  }

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/dashboard" className="btn-link">⬅ Powrót do dashboardu</Link>
      </div>

      <h2>👥 Lista użytkowników</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>E-mail</th>
            <th style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>Rola</th>
            <th style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                <input
                  value={user.email}
                  onChange={e => handleChange(user._id, 'email', e.target.value)}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                <select
                  value={user.role}
                  onChange={e => handleChange(user._id, 'role', e.target.value)}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                <button onClick={() => handleSave(user._id)} className="btn-link">💾 Zapisz</button>{' '}
                <button onClick={() => handleDelete(user._id)} className="btn-danger">🗑 Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
