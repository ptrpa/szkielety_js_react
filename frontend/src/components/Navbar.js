import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">Strona Główna</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-3">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    role="button"
                    onClick={logout}
                    style={{ cursor: 'pointer' }}
                  >
                    Wyloguj
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Zaloguj się</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Zarejestruj się</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
