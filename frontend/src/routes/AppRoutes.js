// src/routes/AppRoutes.js
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import PrivateRoute from './PrivateRoute'


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={  <PrivateRoute> <DashboardPage /> </PrivateRoute>} />

      <Route path="*" element={<h2>404 – Nie znaleziono</h2>} />
      
    </Routes>
  )
}
