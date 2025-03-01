import { useState, useEffect } from 'react'
import './App.css'
import Piano from './components/Piano'
import Dedication from './components/Dedication'

function App() {
  const [showDedication, setShowDedication] = useState(false);
  
  // Control de evento de cierre de pestaña
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Mostrar dedicatoria en lugar de cerrar inmediatamente
      if (!showDedication) {
        e.preventDefault();
        e.returnValue = '';
        setShowDedication(true);
        return '';
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [showDedication]);
  
  const handleCloseDedication = () => {
    setShowDedication(false);
  };
  
  return (
    <div className="app">
      <header>
        {/* Se ha eliminado todo el texto del encabezado */}
      </header>
      
      <main>
        <Piano />
      </main>
      
      <footer>
        <p>Creado con React y Vite</p>
        <button 
          className="dedication-trigger"
          onClick={() => setShowDedication(true)}
        >
          Ver dedicatoria
        </button>
      </footer>
      
      {showDedication && <Dedication onClose={handleCloseDedication} />}
    </div>
  )
}

export default App
