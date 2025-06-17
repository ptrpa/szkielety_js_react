function validateModelInput(data) {
  const { name, variables, equations, parameters, initialConditions } = data

  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new Error('Model musi mieć nazwę')
  }

  if (!Array.isArray(variables) || variables.length === 0) {
    throw new Error('Model musi zawierać co najmniej jedną zmienną')
  }

  if (!equations || typeof equations !== 'object') {
    throw new Error('Brak poprawnych równań')
  }

  const eqKeys = Object.keys(equations)

  // Każda zmienna musi mieć równanie
  for (const v of variables) {
    if (!eqKeys.includes(v)) {
      throw new Error(`Brakuje równania dla zmiennej: ${v}`)
    }
  }

  // Równania tylko dla zmiennych
  for (const key of eqKeys) {
    if (!variables.includes(key)) {
      throw new Error(`Równanie z nieznaną zmienną: ${key}`)
    }
    const expr = equations[key]
    if (typeof expr !== 'string' || expr.trim() === '') {
      throw new Error(`Równanie dla ${key} jest puste lub niepoprawne`)
    }
  }

  // Warunki początkowe tylko dla znanych zmiennych
  if (!initialConditions || typeof initialConditions !== 'object') {
    throw new Error('Brak warunków początkowych')
  }

  for (const [key, value] of Object.entries(initialConditions)) {
    if (!variables.includes(key)) {
      throw new Error(`Warunek początkowy dla nieistniejącej zmiennej: ${key}`)
    }
    if (typeof value !== 'number') {
      throw new Error(`Warunek początkowy dla ${key} nie jest liczbą`)
    }
  }

  // Parametry opcjonalne, ale jeśli są – muszą być liczbami
  if (parameters && typeof parameters === 'object') {
    for (const [key, value] of Object.entries(parameters)) {
      if (typeof value !== 'number') {
        throw new Error(`Parametr ${key} nie jest liczbą`)
      }
    }
  }
}

module.exports = { validateModelInput }
