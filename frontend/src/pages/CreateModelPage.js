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
      const payload = {
        name: form.name,
        description: form.description,
        variables: form.variables,
        equations: Object.fromEntries(form.equations.map(e => [e.variable, e.expression])),
        parameters: Object.fromEntries(form.parameters.map(p => [p.name, p.value])),
        initialConditions: Object.fromEntries(form.initialConditions.map(ic => [ic.variable, ic.value]))
      }

      await createModel(payload)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container" style={{ maxWidth: '900px', margin: '2rem auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/dashboard" className="btn-link">⬅ Powrót do dashboardu</Link>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '1rem' }}>Tworzenie nowego modelu</h2>

        <div className="form-group">
          <label>Nazwa:</label>
          <input value={form.name} onChange={e => handleChange('name', e.target.value)} />
        </div>

        <div className="form-group">
          <label>Opis:</label>
          <input value={form.description} onChange={e => handleChange('description', e.target.value)} />
        </div>

        {['variables', 'equations', 'parameters', 'initialConditions'].map((section) => (
          <div className="form-section" key={section}>
            <label>{section === 'variables' ? 'Zmienne:' :
              section === 'equations' ? 'Równania:' :
              section === 'parameters' ? 'Parametry:' : 'Warunki początkowe:'}</label>

            {form[section].map((item, i) => (
              <div key={i} className="form-inline">
                {section === 'variables' ? (
                  <input
                    value={item}
                    onChange={e => {
                      const updated = [...form.variables]
                      updated[i] = e.target.value
                      handleChange('variables', updated)
                    }}
                  />
                ) : (
                  Object.entries(item).map(([key, val]) => (
                    <input
                      key={key}
                      placeholder={key}
                      type={typeof val === 'number' ? 'number' : 'text'}
                      value={val}
                      onChange={e =>
                        updateItem(section, i, key, typeof val === 'number' ? parseFloat(e.target.value) : e.target.value)
                      }
                    />
                  ))
                )}
                <button type="button" onClick={() => removeItem(section, i)}>🗑</button>
              </div>
            ))}
            <button type="button" onClick={() => addItem(section,
              section === 'variables' ? '' :
              section === 'equations' ? { variable: '', expression: '' } :
              section === 'parameters' ? { name: '', value: 0 } : { variable: '', value: 0 }
            )}>
              + Dodaj {section === 'variables' ? 'zmienną' : section === 'equations' ? 'równanie' : section === 'parameters' ? 'parametr' : 'warunek początkowy'}
            </button>
          </div>
        ))}

        <button type="submit" className="btn-link" style={{ marginTop: '1rem' }}>💾 Zapisz model</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}
