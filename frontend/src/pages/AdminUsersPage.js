// src/pages/AdminPanelPage.js
import React, { useEffect, useState } from 'react'
import { getAllUsers, updateUser, deleteUser } from '../api/admin'
import { Link } from 'react-router-dom'

export default function AdminPanelPage() {
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
    <div>
      <h2>Lista użytkowników</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>E-mail</th>
            <th>Rola</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>
                <input
                  value={user.email}
                  onChange={e => handleChange(user._id, 'email', e.target.value)}
                />
              </td>
              <td>
                <select
                  value={user.role}
                  onChange={e => handleChange(user._id, 'role', e.target.value)}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleSave(user._id)}>💾 Zapisz</button>{' '}
                <button onClick={() => handleDelete(user._id)}>🗑 Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1em' }}>
        <Link to="/dashboard">⬅ Powrót do dashboardu</Link>
      </div>
    </div>
  )
}
