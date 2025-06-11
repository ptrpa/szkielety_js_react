import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createModel } from '../api/models'

export default function CreateModelPage() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    variables: ['x', 'v'],
    equations: { x: 'v', v: '-x' },
    parameters: { m: 1 },
    initialConditions: { x: 1, v: 0 },
  })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createModel(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nowy model</h2>
      <input
        name="name"
        placeholder="Nazwa modelu"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="description"
        placeholder="Opis"
        value={form.description}
        onChange={handleChange}
      />
      <button type="submit">Zapisz</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
