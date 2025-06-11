// src/api/admin.js
import { getToken } from '../utils/token'

const ADMIN_URL = 'http://localhost:5001/api/admin'

function authHeader() {
  return {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  }
}

export async function getAllUsers() {
  const res = await fetch(`${ADMIN_URL}/users`, { headers: authHeader() })
  if (!res.ok) throw new Error('Błąd pobierania użytkowników')
  return await res.json()
}

export async function updateUser(id, data) {
  const res = await fetch(`${ADMIN_URL}/users/${id}`, {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Błąd aktualizacji użytkownika')
  return await res.json()
}

export async function deleteUser(id) {
  const res = await fetch(`${ADMIN_URL}/users/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  })
  if (!res.ok) throw new Error('Błąd usuwania użytkownika')
}
