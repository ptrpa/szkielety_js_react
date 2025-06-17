import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { getAllModels } from '../api/models';
import { getAllUsers } from '../api/admin';

export default function DashboardPage() {
  const { user } = useAuth();
  const [models, setModels] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const modelsData = await getAllModels();
        setModels(modelsData);

        if (user.role === 'admin') {
          const usersData = await getAllUsers();
          setUsers(usersData);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [user]);

  if (!user) return <div className="text-center mt-5">Ładowanie...</div>;

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <h2 className="mb-4">
          Witaj, <span className="text-primary">{user.email}</span>
        </h2>

        {user.role === 'admin' ? (
          <>
            <div className="mb-3">
              <p className="mb-1">
                <i className="bi bi-shield-lock me-2"></i>
                <strong>Uprawnienia:</strong> Administrator
              </p>
              <p className="mb-1">
                <i className="bi bi-people me-2"></i>
                <strong>Użytkowników:</strong> {users.length}
              </p>
              <p className="mb-3">
                <i className="bi bi-box me-2"></i>
                <strong>Modeli:</strong> {models.length}
              </p>
            </div>

            <div className="d-grid gap-2 d-md-block">
              <Link to="/admin/users" className="btn btn-outline-primary me-2">
                <i className="bi bi-people me-1"></i>Zarządzaj użytkownikami
              </Link>
              <Link to="/admin/models" className="btn btn-outline-secondary me-2">
                <i className="bi bi-box me-1"></i>Zarządzaj modelami
              </Link>
              <Link to="/settings" className="btn btn-outline-dark">
                <i className="bi bi-gear me-1"></i>Ustawienia
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="mb-3">
              <p className="mb-1">
                <i className="bi bi-box me-2"></i>
                Masz <strong>{models.length}</strong> modeli.
              </p>
              {models.length > 0 && (
                <p className="mb-3">
                  <i className="bi bi-clock me-2"></i>
                  Ostatni model: <strong>{models[models.length - 1].name}</strong>
                </p>
              )}
            </div>

            <div className="d-grid gap-2 d-md-block">
              <Link to="/models" className="btn btn-outline-primary me-2">
                <i className="bi bi-folder2-open me-1"></i>Przeglądaj modele
              </Link>
              <Link to="/models/new" className="btn btn-outline-success me-2">
                <i className="bi bi-plus me-1"></i>Utwórz nowy model
              </Link>
              <Link to="/settings" className="btn btn-outline-dark">
                <i className="bi bi-gear me-1"></i>Ustawienia
              </Link>
            </div>
          </>
        )}

        {error && (
          <div className="alert alert-danger mt-4" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
