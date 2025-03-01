import { useState, useEffect } from 'react';
import '../styles/Dedication.css';

const Dedication = ({ onClose }) => {
  const [animationStep, setAnimationStep] = useState(0);
  
  useEffect(() => {
    // Secuencia de animación
    const animationTimeline = setTimeout(() => {
      if (animationStep < 3) {
        setAnimationStep(prev => prev + 1);
      }
    }, 1000);
    
    return () => clearTimeout(animationTimeline);
  }, [animationStep]);
  
  return (
    <div className="dedication-overlay">
      <div className={`dedication-container step-${animationStep}`}>
        <div className="dedication-content">
          <h2 className="dedication-title">¡Gracias por tu enseñanza!</h2>
          <div className="piano-icon">
            {/* Piano SVG animation */}
            <svg viewBox="0 0 100 50" width="100" height="50">
              <rect width="100" height="40" rx="5" fill="#333" />
              {/* Teclas blancas */}
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <rect 
                  key={`white-key-${i}`}
                  x={i * 14 + 1} 
                  y="1" 
                  width="12" 
                  height="38" 
                  fill="white" 
                  className={`piano-key white-key-${i}`} 
                />
              ))}
              {/* Teclas negras */}
              {[0, 1, 3, 4, 5].map((i) => (
                <rect 
                  key={`black-key-${i}`}
                  x={i === 0 || i === 1 ? i * 14 + 9 : i * 14 + 9 - 14} 
                  y="1" 
                  width="8" 
                  height="25" 
                  fill="black" 
                  className={`piano-key black-key-${i}`} 
                />
              ))}
              {/* Notas musicales animadas */}
              {[1, 2, 3].map((i) => (
                <text 
                  key={`note-${i}`}
                  x={i * 25} 
                  y="30"
                  fontSize="12"
                  fill="#FFD700"
                  className={`music-note note-${i}`}
                  style={{ opacity: animationStep > 0 ? 1 : 0 }}
                >
                  ♪
                </text>
              ))}
            </svg>
          </div>
          <p className="dedication-message">
            Para el profesor Farid Bagheri
          </p>
          <p className="dedication-submessage">
            Gracias por inspirarme a crear esta aplicación de piano.
            <br />Tu pasión por la enseñanza hace que aprender sea una melodía.
          </p>
          <button className="dedication-close" onClick={onClose}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dedication;