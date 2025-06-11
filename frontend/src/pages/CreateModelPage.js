import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createModel } from '../api/models'

export default function CreateModelPage() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    variables: ['x', 'v'],
    equations: [
      { variable: 'x', expression: 'v' },
      { variable: 'v', expression: '-x' }
    ],
    parameters: [{ name: 'm', value: 1 }],
    initialConditions: [{ variable: 'x', value: 1 }, { variable: 'v', value: 0 }]
  })

  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const updateItem = (section, index, key, value) => {
    const updated = [...form[section]]
    updated[index][key] = value
    setForm(prev => ({ ...prev, [section]: updated }))
  }

  const addItem = (section, template) => {
    setForm(prev => ({ ...prev, [section]: [...prev[section], template] }))
  }

  const removeItem = (section, index) => {
    const updated = form[section].filter((_, i) => i !== index)
    setForm(prev => ({ ...prev, [section]: updated }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const equationsObj = Object.fromEntries(form.equations.map(e => [e.variable, e.expression]))
      const parametersObj = Object.fromEntries(form.parameters.map(p => [p.name, p.value]))
      const initialObj = Object.fromEntries(form.initialConditions.map(ic => [ic.variable, ic.value]))

      const payload = {
        name: form.name,
        description: form.description,
        variables: form.variables,
        equations: equationsObj,
        parameters: parametersObj,
        initialConditions: initialObj
      }

      await createModel(payload)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <Link to="/dashboard">⬅ Powrót do dashboardu</Link>
      <form onSubmit={handleSubmit}>
        <h2>Tworzenie nowego modelu</h2>

        <div>
          <label>Nazwa:</label>
          <input value={form.name} onChange={e => handleChange('name', e.target.value)} />
        </div>

        <div>
          <label>Opis:</label>
          <input value={form.description} onChange={e => handleChange('description', e.target.value)} />
        </div>

        <div>
          <label>Zmienne:</label>
          {form.variables.map((v, i) => (
            <div key={i}>
              <input
                value={v}
                onChange={e => {
                  const updated = [...form.variables]
                  updated[i] = e.target.value
                  handleChange('variables', updated)
                }}
              />
              <button type="button" onClick={() => removeItem('variables', i)}>🗑</button>
            </div>
          ))}
          <button type="button" onClick={() => addItem('variables', '')}>+ Dodaj zmienną</button>
        </div>

        <div>
          <label>Równania:</label>
          {form.equations.map((eq, i) => (
            <div key={i}>
              <input
                placeholder="Zmienna"
                value={eq.variable}
                onChange={e => updateItem('equations', i, 'variable', e.target.value)}
              />
              <input
                placeholder="Wyrażenie"
                value={eq.expression}
                onChange={e => updateItem('equations', i, 'expression', e.target.value)}
              />
              <button type="button" onClick={() => removeItem('equations', i)}>🗑</button>
            </div>
          ))}
          <button type="button" onClick={() => addItem('equations', { variable: '', expression: '' })}>+ Dodaj równanie</button>
        </div>

        <div>
          <label>Parametry:</label>
          {form.parameters.map((p, i) => (
            <div key={i}>
              <input
                placeholder="Nazwa"
                value={p.name}
                onChange={e => updateItem('parameters', i, 'name', e.target.value)}
              />
              <input
                type="number"
                placeholder="Wartość"
                value={p.value}
                onChange={e => updateItem('parameters', i, 'value', parseFloat(e.target.value))}
              />
              <button type="button" onClick={() => removeItem('parameters', i)}>🗑</button>
            </div>
          ))}
          <button type="button" onClick={() => addItem('parameters', { name: '', value: 0 })}>+ Dodaj parametr</button>
        </div>

        <div>
          <label>Warunki początkowe:</label>
          {form.initialConditions.map((ic, i) => (
            <div key={i}>
              <input
                placeholder="Zmienna"
                value={ic.variable}
                onChange={e => updateItem('initialConditions', i, 'variable', e.target.value)}
              />
              <input
                type="number"
                placeholder="Wartość"
                value={ic.value}
                onChange={e => updateItem('initialConditions', i, 'value', parseFloat(e.target.value))}
              />
              <button type="button" onClick={() => removeItem('initialConditions', i)}>🗑</button>
            </div>
          ))}
          <button type="button" onClick={() => addItem('initialConditions', { variable: '', value: 0 })}>+ Dodaj warunek początkowy</button>
        </div>

        <button type="submit">💾 Zapisz model</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}
