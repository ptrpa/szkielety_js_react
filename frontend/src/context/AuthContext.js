// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from 'react'
import { getToken, removeToken, setToken as saveToken } from '../utils/token'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)

useEffect(() => {
  const token = getToken()
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      setUser({ ...payload, token })
    } catch (err) {
      removeToken()
    }
  }
  setLoading(false)
}, [])


  const login = (token) => {
    saveToken(token)
    const payload = JSON.parse(atob(token.split('.')[1]))
    setUser({ ...payload, token })
  }

  const logout = () => {
    removeToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
