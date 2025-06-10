// src/routes/PrivateRoute.js
import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

if (loading) return <p>Ładowanie...</p>

return user ? children : <Navigate to="/login" replace />

}
