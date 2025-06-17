// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      <div className="card shadow-sm p-4 text-center">
        <h1 className="mb-4">
          <i className="bi bi-house-door me-2"></i>
          Witaj w aplikacji modeli dynamicznych
        </h1>

        <p className="mb-4">
          Twórz, edytuj i analizuj modele układów dynamicznych.<br />
          Użytkownicy mogą zarządzać swoimi modelami, a administratorzy nadzorować system.
        </p>

        {user ? (
          <>
            <p className="mb-3">
              Zalogowany jako: <strong>{user.role}</strong>
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn btn-primary"
            >
              <i className="bi bi-speedometer2 me-2"></i>
              Przejdź do panelu użytkownika
            </button>
          </>
        ) : (
          <>
            <p className="mb-2">Nie jesteś zalogowany.</p>
            <p className="text-muted">
              <strong>Zaloguj się</strong> lub <strong>zarejestruj</strong>, używając opcji w górnym menu.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
