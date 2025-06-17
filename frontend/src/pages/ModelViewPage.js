import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getModelById } from '../api/models'
import useAuth from '../hooks/useAuth'

export default function ModelViewPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [model, setModel] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const data = await getModelById(id)
        setModel(data)
      } catch (err) {
        setError('Nie udało się pobrać modelu')
      }
    }
    fetchModel()
  }, [id])

  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!model) return <p>Ładowanie...</p>

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Link to={user?.role === 'admin' ? "/admin/models" : "/models"} className="btn-link">
          ⬅ Powrót do listy modeli
        </Link>
      </div>

      <div className="card" style={{ padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '1rem' }}>{model.name}</h2>

        <p><strong>Opis:</strong> {model.description}</p>
        <p><strong>Zmienne:</strong> {model.variables.join(', ')}</p>

        <div>
          <strong>Równania:</strong>
          <ul>
            {Object.entries(model.equations).map(([k, v]) => (
              <li key={k}>{k}′ = {v}</li>
            ))}
          </ul>
        </div>

        <p><strong>Parametry:</strong> {JSON.stringify(model.parameters)}</p>
        <p><strong>Warunki początkowe:</strong> {JSON.stringify(model.initialConditions)}</p>
      </div>
    </div>
  )
}
