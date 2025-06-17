// src/pages/ModelViewPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getModelById } from '../api/models';
import useAuth from '../hooks/useAuth';

export default function ModelViewPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const data = await getModelById(id);
        setModel(data);
      } catch (err) {
        setError('Nie udało się pobrać modelu');
      }
    };
    fetchModel();
  }, [id]);

  if (error) {
    return <div className="alert alert-danger my-4">{error}</div>;
  }

  if (!model) {
    return <div className="text-center my-4">Ładowanie...</div>;
  }

  return (
    <div className="container my-5" style={{ maxWidth: '800px' }}>
      <div className="mb-3">
        <Link
          to={user?.role === 'admin' ? "/admin/models" : "/models"}
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="bi bi-arrow-left me-1"></i> Powrót do listy modeli
        </Link>
      </div>

      <div className="card shadow-sm p-4">
        <h2 className="mb-4">{model.name}</h2>

        <p><strong>Opis:</strong> {model.description}</p>
        <p><strong>Zmienne:</strong> {model.variables.join(', ')}</p>

        <div className="mb-3">
          <strong>Równania:</strong>
          <ul className="mt-2">
            {Object.entries(model.equations).map(([k, v]) => (
              <li key={k}>{k}′ = {v}</li>
            ))}
          </ul>
        </div>

        <p><strong>Parametry:</strong> {JSON.stringify(model.parameters)}</p>
        <p><strong>Warunki początkowe:</strong> {JSON.stringify(model.initialConditions)}</p>
      </div>
    </div>
  );
}
