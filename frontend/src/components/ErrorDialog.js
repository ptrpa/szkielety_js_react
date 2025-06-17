import React from 'react'

export default function ErrorDialog({ message, onClose }) {
  if (!message) return null

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3 style={{ marginTop: 0 }}>Błąd</h3>
        <p>{message}</p>
        <button onClick={onClose} style={buttonStyle}>OK</button>
      </div>
    </div>
  )
}

const overlayStyle = {
  position: 'fixed',
  top: 0, left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
}

const modalStyle = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  maxWidth: '400px',
  width: '90%',
  textAlign: 'center'
}

const buttonStyle = {
  marginTop: '1rem',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer'
}
