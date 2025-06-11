// src/api/models.js
import { getToken } from '../utils/token'

const BASE_URL = 'http://localhost:5001/api/models'

function authHeader() {
  return {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  }
}

export async function getAllModels() {
  const res = await fetch(BASE_URL, { headers: authHeader() })
  if (!res.ok) throw new Error('Nie udało się pobrać modeli')
  return await res.json()
}

export async function createModel(modelData) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(modelData),
  })
  if (!res.ok) throw new Error('Nie udało się utworzyć modelu')
  return await res.json()
}

export async function getModelById(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { headers: authHeader() })
  if (!res.ok) throw new Error('Nie udało się pobrać modelu')
  return await res.json()
}

export async function updateModel(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Nie udało się zaktualizować modelu')
  return await res.json()
}


export async function deleteModel(id) {
  const res = await fetch(`http://localhost:5001/api/models/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  if (!res.ok) throw new Error('Nie udało się usunąć modelu')
}


export async function getAllModelsForAdmin() {
  const res = await fetch('http://localhost:5001/api/admin/models', {
    headers: authHeader()
  })
  if (!res.ok) throw new Error('Nie udało się pobrać modeli (admin)')
  return await res.json()
}
