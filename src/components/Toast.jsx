import React, { useState, useEffect } from 'react';
import '../styles/Toast.css';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Esperar a que termine la animación
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`toast ${type} ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="toast-content">
        <div className="toast-icon">
          {type === 'success' && '✅'}
          {type === 'error' && '❌'}
          {type === 'warning' && '⚠️'}
          {type === 'info' && 'ℹ️'}
        </div>
        <div className="toast-message">{message}</div>
        <button className="toast-close" onClick={handleClose}>
          ×
        </button>
      </div>
      <div className="toast-progress">
        <div className="toast-progress-bar" style={{ animationDuration: `${duration}ms` }}></div>
      </div>
    </div>
  );
};

export default Toast;
