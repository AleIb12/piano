import { useState, useEffect } from 'react'
import './App.css'
import Piano from './components/Piano'

function App() {
  return (
    <div className="app">
      <header>
        {/* Encabezado del piano */}
      </header>
      
      <main>
        <Piano />
      </main>
      
      <footer>
        <p>Creado con React y Vite</p>
      </footer>
    </div>
  )
}

export default App
