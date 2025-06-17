// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import useAuth from '../hooks/useAuth';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = await loginUser(form);
      login(token);
      navigate('/dashboard');
    } catch (err) {
      setError('Nieprawidłowy login lub hasło');
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '400px' }}>
      <div className="card shadow-sm p-4">
        <h2 className="mb-4 text-center">
          <i className="bi bi-box-arrow-in-right me-2"></i>Logowanie
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
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success">Zaloguj</button>
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
