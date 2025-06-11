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

        setForm({
          name: model.name,
          description: model.description || '',
          variables: model.variables || [],
          equations: Object.entries(model.equations || {}).map(([variable, expression]) => ({ variable, expression })),
          parameters: Object.entries(model.parameters || {}).map(([name, value]) => ({ name, value })),
          initialConditions: Object.entries(model.initialConditions || {}).map(([variable, value]) => ({ variable, value }))
        })
      } catch (err) {
        setError('Nie udało się załadować modelu')
      }
    }
    fetch()
  }, [id])

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
      const payload = {
        name: form.name,
        description: form.description,
        variables: form.variables,
        equations: Object.fromEntries(form.equations.map(e => [e.variable, e.expression])),
        parameters: Object.fromEntries(form.parameters.map(p => [p.name, p.value])),
        initialConditions: Object.fromEntries(form.initialConditions.map(ic => [ic.variable, ic.value]))
      }

      await updateModel(id, payload)
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

        <button type="submit">💾 Zapisz zmiany</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      <div style={{ marginTop: '1em' }}>
        <Link to="/models">⬅ Powrót do listy modeli</Link>
      </div>
    </div>
  )
}
