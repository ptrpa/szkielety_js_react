import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllModelsForAdmin, deleteModel } from '../api/models';

export default function AdminModelsPage() {
  const [models, setModels] = useState([]);
  const [error, setError] = useState(null);

  const fetchModels = async () => {
    try {
      const data = await getAllModelsForAdmin();
      setModels(data);
    } catch (err) {
      setError('Nie udało się pobrać modeli');
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Czy na pewno chcesz usunąć ten model?');
    if (!confirm) return;
    try {
      await deleteModel(id);
      fetchModels();
    } catch (err) {
      setError('Nie udało się usunąć modelu');
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '900px' }}>
      <div className="mb-3">
        <Link to="/dashboard" className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-arrow-left me-1"></i>Powrót do dashboardu
        </Link>
      </div>

      <h2 className="mb-4">
        <i className="bi bi-box-seam me-2"></i>Zarządzanie modelami
      </h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {models.length === 0 ? (
        <div className="alert alert-info">Brak modeli w systemie</div>
      ) : (
        <div className="list-group">
          {models.map((model) => (
            <div
              key={model._id}
              className="list-group-item mb-3 shadow-sm rounded border"
            >
              <h5 className="mb-1">{model.name}</h5>
              <p className="mb-2 text-muted">{model.description}</p>
              <p className="mb-2 text-muted">
                <i className="bi bi-person me-1"></i>
                Właściciel:{' '}
                <em>{model.userId?.email || 'Nieznany'}</em>
              </p>
              <div className="d-flex gap-2 flex-wrap">
                <Link
                  to={`/models/${model._id}`}
                  className="btn btn-outline-primary btn-sm"
                >
                  <i className="bi bi-eye me-1"></i>Podgląd
                </Link>
                <Link
                  to={`/models/${model._id}/edit`}
                  className="btn btn-outline-secondary btn-sm"
                >
                  <i className="bi bi-pencil me-1"></i>Edytuj
                </Link>
                <button
                  onClick={() => handleDelete(model._id)}
                  className="btn btn-outline-danger btn-sm"
                >
                  <i className="bi bi-trash me-1"></i>Usuń
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
