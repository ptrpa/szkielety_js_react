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
