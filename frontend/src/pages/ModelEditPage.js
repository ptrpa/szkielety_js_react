// src/pages/ModelEditPage.js
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getModelById, updateModel } from '../api/models'

export default function ModelEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const model = await getModelById(id)
        setForm(model)
      } catch (err) {
        setError('Nie udało się załadować modelu')
      }
    }
    fetch()
  }, [id])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await updateModel(id, form)
      navigate('/models')
    } catch (err) {
      setError('Błąd zapisu')
    }
  }

  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!form) return <p>Ładowanie...</p>

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Edytuj model</h2>
        <input name="name" value={form.name} onChange={handleChange} />
        <input name="description" value={form.description} onChange={handleChange} />
        <button type="submit">Zapisz zmiany</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      <div style={{ marginTop: '1em' }}>
        <Link to="/models">⬅ Powrót do listy modeli</Link>
      </div>
    </div>
  )
}
