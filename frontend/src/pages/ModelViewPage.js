// src/pages/ModelViewPage.js
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getModelById } from '../api/models'

export default function ModelViewPage() {
  const { id } = useParams()
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
    <div>
      <h2>{model.name}</h2>
      <p><strong>Opis:</strong> {model.description}</p>
      <p><strong>Zmienne:</strong> {model.variables.join(', ')}</p>
      <p><strong>Równania:</strong></p>
      <ul>
        {Object.entries(model.equations).map(([k, v]) => (
          <li key={k}>{k}′ = {v}</li>
        ))}
      </ul>
      <p><strong>Parametry:</strong> {JSON.stringify(model.parameters)}</p>
      <p><strong>Warunki początkowe:</strong> {JSON.stringify(model.initialConditions)}</p>

      <div style={{ marginTop: '1em' }}>
        <Link to="/models">⬅ Powrót do listy modeli</Link>
      </div>
    </div>
  )
}
