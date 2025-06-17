// src/utils/validateModelForm.js

export default function validateModelForm(form) {
  if (!form.name || !form.name.trim()) return "Model musi mieć nazwę"
  if (!form.variables || form.variables.length === 0) return "Brak zmiennych"
  if (!form.equations || !Array.isArray(form.equations)) return "Brak równań"
  if (!form.initialConditions || !Array.isArray(form.initialConditions)) return "Brak warunków początkowych"

  const variables = form.variables
  const eqMap = Object.fromEntries(form.equations.map(e => [e.variable, e.expression]))
  const icMap = Object.fromEntries(form.initialConditions.map(ic => [ic.variable, ic.value]))

  for (const v of variables) {
    if (!(v in eqMap)) return `Brakuje równania dla zmiennej: ${v}`
    if (!eqMap[v].trim()) return `Równanie dla ${v} jest puste lub niepoprawne`
    if (!(v in icMap)) return `Brakuje warunku początkowego dla zmiennej: ${v}`
    if (typeof icMap[v] !== 'number') return `Warunek początkowy dla ${v} nie jest liczbą`
  }

  for (const key of Object.keys(eqMap)) {
    if (!variables.includes(key)) return `Równanie z nieznaną zmienną: ${key}`
  }

  for (const key of Object.keys(icMap)) {
    if (!variables.includes(key)) return `Warunek początkowy dla nieistniejącej zmiennej: ${key}`
  }

  if (form.parameters) {
    for (const param of form.parameters) {
      if (typeof param.value !== 'number') return `Parametr ${param.name} nie jest liczbą`
    }
  }

  return null // brak błędów
}
