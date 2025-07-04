// src/routes/AppRoutes.js
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import ModelsPage from '../pages/ModelsPage'
import CreateModelPage from '../pages/CreateModelPage'
import ModelViewPage from '../pages/ModelViewPage'
import ModelEditPage from '../pages/ModelEditPage'
import AdminUsersPage from '../pages/AdminUsersPage'
import AdminModelsPage from '../pages/AdminModelsPage'
import SettingsPage from '../pages/SettingsPage'

import PrivateRoute from './PrivateRoute'


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={  <PrivateRoute> <DashboardPage /> </PrivateRoute>} />
      <Route path="/models" element={<PrivateRoute><ModelsPage /></PrivateRoute>} />
      <Route path="/models/new" element={  <PrivateRoute><CreateModelPage /></PrivateRoute>} />
      <Route path="/models/:id" element={<PrivateRoute><ModelViewPage /></PrivateRoute>} />
      <Route path="/admin/users" element={<PrivateRoute><AdminUsersPage /></PrivateRoute>} />
      <Route path="/admin/models" element={<PrivateRoute><AdminModelsPage /></PrivateRoute>}/>      
      <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />


      <Route path="/models/:id/edit" element={<PrivateRoute><ModelEditPage /></PrivateRoute>} />

      <Route path="*" element={<h2>404 – Nie znaleziono</h2>} />
      
    </Routes>
  )
}
