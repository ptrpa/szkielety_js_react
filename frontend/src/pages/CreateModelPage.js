import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createModel } from '../api/models';
import validateModelForm from '../utils/validateModelForm';
import ErrorDialog from '../components/ErrorDialog';

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
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const updateItem = (section, index, key, value) => {
    const updated = [...form[section]];
    updated[index][key] = value;
    setForm(prev => ({ ...prev, [section]: updated }));
  };

  const addItem = (section, template) => {
    setForm(prev => ({ ...prev, [section]: [...prev[section], template] }));
  };

  const removeItem = (section, index) => {
    const updated = form[section].filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, [section]: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateModelForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const payload = {
        name: form.name,
        description: form.description,
        variables: form.variables,
        equations: Object.fromEntries(form.equations.map(e => [e.variable, e.expression])),
        parameters: Object.fromEntries(form.parameters.map(p => [p.name, p.value])),
        initialConditions: Object.fromEntries(form.initialConditions.map(ic => [ic.variable, ic.value]))
      };

      await createModel(payload);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Błąd zapisu');
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '900px' }}>
      <div className="mb-3">
        <Link to="/dashboard" className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-arrow-left me-1"></i> Powrót do dashboardu
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="card shadow-sm p-4">
        <h2 className="mb-4">Tworzenie nowego modelu</h2>

        <div className="mb-3">
          <label className="form-label">Nazwa:</label>
          <input
            className="form-control"
            value={form.name}
            onChange={e => handleChange('name', e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Opis:</label>
          <input
            className="form-control"
            value={form.description}
            onChange={e => handleChange('description', e.target.value)}
          />
        </div>

        {['variables', 'equations', 'parameters', 'initialConditions'].map((section) => (
          <div className="mb-4" key={section}>
            <label className="form-label">
              {section === 'variables' ? 'Zmienne' :
                section === 'equations' ? 'Równania' :
                  section === 'parameters' ? 'Parametry' : 'Warunki początkowe'}:
            </label>

            {form[section].map((item, i) => (
              <div key={i} className="d-flex gap-2 mb-2 flex-wrap">
                {section === 'variables' ? (
                  <input
                    className="form-control"
                    value={item}
                    onChange={e => {
                      const updated = [...form.variables];
                      updated[i] = e.target.value;
                      handleChange('variables', updated);
                    }}
                  />
                ) : (
                  Object.entries(item).map(([key, val]) => (
                    <input
                      key={key}
                      className="form-control"
                      placeholder={key}
                      type={typeof val === 'number' ? 'number' : 'text'}
                      value={val}
                      onChange={e =>
                        updateItem(section, i, key, typeof val === 'number' ? parseFloat(e.target.value) : e.target.value)
                      }
                    />
                  ))
                )}
                <button
                  type="button"
                  onClick={() => removeItem(section, i)}
                  className="btn btn-outline-danger btn-sm"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addItem(section,
                section === 'variables' ? '' :
                  section === 'equations' ? { variable: '', expression: '' } :
                    section === 'parameters' ? { name: '', value: 0 } : { variable: '', value: 0 }
              )}
              className="btn btn-outline-primary btn-sm"
            >
              <i className="bi bi-plus me-1"></i>Dodaj {section === 'variables' ? 'zmienną' :
                section === 'equations' ? 'równanie' :
                  section === 'parameters' ? 'parametr' : 'warunek początkowy'}
            </button>
          </div>
        ))}

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-save me-2"></i>Zapisz model
          </button>
        </div>
      </form>

      {error && <ErrorDialog message={error} onClose={() => setError(null)} />}
    </div>
  );
}
