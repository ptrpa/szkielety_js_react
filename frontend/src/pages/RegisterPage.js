// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';
import useAuth from '../hooks/useAuth';

export default function RegisterPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = await registerUser(form);
      login(token);
      navigate('/');
    } catch (err) {
      setError('Nie udało się zarejestrować');
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '400px' }}>
      <div className="card shadow-sm p-4">
        <h2 className="mb-4 text-center">
          <i className="bi bi-person-plus me-2"></i>Rejestracja
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Hasło:</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Hasło"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success">Zarejestruj się</button>
          </div>

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
