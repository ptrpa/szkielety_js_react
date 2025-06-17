import { getToken } from '../utils/token';

// LOGIN
export async function loginUser({ email, password }) {
  const res = await fetch('http://localhost:5001/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Błąd logowania');
  }

  return data.token;
}

// REGISTER
export async function registerUser({ email, password }) {
  const res = await fetch('http://localhost:5001/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Błąd rejestracji');
  }

  return data.token;
}

// CHANGE PASSWORD
export async function changePassword(currentPassword, newPassword) {
  const res = await fetch('http://localhost:5001/api/me/password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Nie udało się zmienić hasła');
  }

  return data;
}
