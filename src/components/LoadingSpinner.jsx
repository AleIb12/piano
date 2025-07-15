import React from 'react';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
  return (
    <div className={`loading-spinner ${size} ${color}`}>
      <div className="spinner-circle"></div>
      <div className="spinner-circle"></div>
      <div className="spinner-circle"></div>
    </div>
  );
};

export default LoadingSpinner;
