import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUser, deleteUser } from '../api/admin';
import { Link } from 'react-router-dom';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (id, field, value) => {
    setUsers(prev =>
      prev.map(u => (u._id === id ? { ...u, [field]: value } : u))
    );
  };

  const handleSave = async (id) => {
    const user = users.find(u => u._id === id);
    try {
      await updateUser(id, { email: user.email, role: user.role });
      fetchUsers();
    } catch (err) {
      setError('Nie udało się zapisać zmian');
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Czy na pewno usunąć użytkownika?');
    if (!confirm) return;
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      setError('Nie udało się usunąć użytkownika');
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '800px' }}>
      <div className="mb-3">
        <Link to="/dashboard" className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-arrow-left me-1"></i> Powrót do dashboardu
        </Link>
      </div>

      <h2 className="mb-3">
        <i className="bi bi-people me-2"></i>Lista użytkowników
      </h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-striped align-middle">
        <thead className="table-light">
          <tr>
            <th style={{ width: '40%' }}>E-mail</th>
            <th style={{ width: '20%' }}>Rola</th>
            <th style={{ width: '40%' }}>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>
                <input
                  className="form-control"
                  value={user.email}
                  onChange={e => handleChange(user._id, 'email', e.target.value)}
                />
              </td>
              <td>
                <select
                  className="form-select"
                  value={user.role}
                  onChange={e => handleChange(user._id, 'role', e.target.value)}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    onClick={() => handleSave(user._id)}
                    className="btn btn-outline-primary btn-sm"
                  >
                    <i className="bi bi-save me-1"></i>Zapisz
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    <i className="bi bi-trash me-1"></i>Usuń
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
