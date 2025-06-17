// src/pages/SettingsPage.js
import React, { useState } from 'react';
import { changePassword } from '../api/auth';
import { Link } from 'react-router-dom';

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await changePassword(currentPassword, newPassword);
      setSuccess('Hasło zostało zmienione.');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '500px' }}>
      <div className="mb-3">
        <Link to="/dashboard" className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-arrow-left me-1"></i> Powrót do dashboardu
        </Link>
      </div>

      <div className="card shadow-sm p-4">
        <h2 className="mb-4">Zmień hasło</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="currentPassword" className="form-label">Obecne hasło:</label>
            <input
              id="currentPassword"
              type="password"
              className="form-control"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">Nowe hasło:</label>
            <input
              id="newPassword"
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Zmień hasło</button>
          </div>

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success mt-3" role="alert">
              {success}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
