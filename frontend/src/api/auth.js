import { getToken } from '../utils/token' //potrzebne dla zmiany hasla

// src/api/auth.js
export async function loginUser({ email, password }) {
  const res = await fetch('http://localhost:5001/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    throw new Error('Błąd logowania')
  }

  const data = await res.json()
  return data.token
}

// src/api/auth.js
export async function registerUser({ email, password }) {
  const res = await fetch('http://localhost:5001/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    throw new Error('Błąd rejestracji')
  }

  const data = await res.json()
  return data.token
}

//zmiana hasla


export async function changePassword(currentPassword, newPassword) {
  const res = await fetch('http://localhost:5001/api/me/password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ currentPassword, newPassword })
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Nie udało się zmienić hasła')
  }

  return await res.json()
}
