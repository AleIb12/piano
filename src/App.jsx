import { useState, useEffect } from 'react'
import './App.css'
import Piano from './components/Piano'

function App() {
  return (
    <div className="app">
      <header>
        <h1>🎹 Piano Virtual</h1>
        <p className="header-subtitle">
          Experimenta la música con nuestro piano virtual profesional
        </p>
      </header>
      
      <main>
        <Piano />
      </main>
      
      <footer>
        <p>Desarrollado con React, Vite y Web Audio API</p>
        <p>© 2025 Piano Virtual - Hecho con 💙 para la música</p>
      </footer>
    </div>
  )
}

export default App
