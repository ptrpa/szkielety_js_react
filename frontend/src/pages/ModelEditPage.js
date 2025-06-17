import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getModelById, updateModel } from '../api/models';
import ErrorDialog from '../components/ErrorDialog';
import validateModelForm from '../utils/validateModelForm';
import useAuth from '../hooks/useAuth';

export default function ModelEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const model = await getModelById(id);
        setForm({
          name: model.name,
          description: model.description || '',
          variables: model.variables || [],
          equations: Object.entries(model.equations || {}).map(([variable, expression]) => ({ variable, expression })),
          parameters: Object.entries(model.parameters || {}).map(([name, value]) => ({ name, value })),
          initialConditions: Object.entries(model.initialConditions || {}).map(([variable, value]) => ({ variable, value }))
        });
      } catch (err) {
        setError('Nie udało się załadować modelu');
      }
    };
    fetch();
  }, [id]);

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
      await updateModel(id, payload);
      navigate(user?.role === 'admin' ? '/admin/models' : '/models');
    } catch (err) {
      setError(err.message || 'Błąd zapisu');
    }
  };

  if (!form) return <div className="text-center my-4">Ładowanie...</div>;

  return (
    <div className="container my-5" style={{ maxWidth: '900px' }}>
      <div className="mb-3">
        <Link
          to={user?.role === 'admin' ? "/admin/models" : "/models"}
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="bi bi-arrow-left me-1"></i> Powrót do listy modeli
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="card shadow-sm p-4">
        <h2 className="mb-4">Edytuj model</h2>

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
              <div key={i} className="d-flex gap-2 mb-2">
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
                        updateItem(section, i, key,
                          typeof val === 'number' ? parseFloat(e.target.value) : e.target.value
                        )
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
            <i className="bi bi-save me-2"></i>Zapisz zmiany
          </button>
        </div>
      </form>

      {error && <ErrorDialog message={error} onClose={() => setError(null)} />}
    </div>
  );
}
