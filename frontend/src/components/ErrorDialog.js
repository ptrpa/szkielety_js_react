import React from 'react';

export default function ErrorDialog({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={overlayStyle}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-danger">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">Błąd</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={onClose}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1050
};
