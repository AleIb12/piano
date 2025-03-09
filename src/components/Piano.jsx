import { useState, useEffect, useRef } from 'react';
import { playSound, playSong } from '../utils/audioUtils';
import { besosEnGuerra, neffexRumors, disturbia } from '../utils/songs';
import AudioRecorder from './AudioRecorder';
import SoundMixer from './SoundMixer';
import '../styles/Piano.css';

/**
 * Piano Virtual - Un puente entre la tecnología y la música
 * 
 * Como una ventana al alma musical, este piano virtual 
 * transforma simples pulsaciones en melodías que danzan en el aire.
 * Cada tecla es una puerta a un mundo de posibilidades sonoras,
 * donde la creatividad fluye libremente a través de tus dedos.
 */
const Piano = () => {
  const [activeKey, setActiveKey] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [musicNotes, setMusicNotes] = useState([]);
  const [colorSplashes, setColorSplashes] = useState([]);
  const songPlayerRef = useRef(null);
  const notesIdCounter = useRef(0);
  const splashIdCounter = useRef(0);
  
  // Piano keys configuration with notes and key mappings
  const pianoKeys = [
    // Primera octava
    { note: 'C1', key: 'z', color: 'white' },
    { note: 'C#1', key: 's', color: 'black' },
    { note: 'D1', key: 'x', color: 'white' },
    { note: 'D#1', key: 'd', color: 'black' },
    { note: 'E1', key: 'c', color: 'white' },
    { note: 'F1', key: 'v', color: 'white' },
    { note: 'F#1', key: 'g', color: 'black' },
    { note: 'G1', key: 'b', color: 'white' },
    { note: 'G#1', key: 'h', color: 'black' },
    { note: 'A1', key: 'n', color: 'white' },
    { note: 'A#1', key: 'j', color: 'black' },
    { note: 'B1', key: 'm', color: 'white' },
    // Segunda octava
    { note: 'C2', key: 'q', color: 'white' },
    { note: 'C#2', key: '2', color: 'black' },
    { note: 'D2', key: 'w', color: 'white' },
    { note: 'D#2', key: '3', color: 'black' },
    { note: 'E2', key: 'e', color: 'white' },
    { note: 'F2', key: 'r', color: 'white' },
    { note: 'F#2', key: '5', color: 'black' },
    { note: 'G2', key: 't', color: 'white' },
    { note: 'G#2', key: '6', color: 'black' },
    { note: 'A2', key: 'y', color: 'white' },
    { note: 'A#2', key: '7', color: 'black' },
    { note: 'B2', key: 'u', color: 'white' },
    // Tercera octava (solo la primera nota)
    { note: 'C3', key: 'i', color: 'white' },
  ];

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return; // Previene repetición cuando se mantiene la tecla pulsada
      
      const key = e.key.toLowerCase();
      const pianoKey = pianoKeys.find(k => k.key === key);
      
      if (pianoKey) {
        playNote(pianoKey.note);
        setActiveKey(pianoKey.note);
        createMusicNote(pianoKey.note);
        createColorSplash(pianoKey.note, pianoKey.color);
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      const pianoKey = pianoKeys.find(k => k.key === key);
      
      if (pianoKey && activeKey === pianoKey.note) {
        setActiveKey(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeKey]);

  /**
   * Como estrellas que brillan en el cielo nocturno,
   * cada nota musical flota y danza en el aire,
   * dejando un rastro de magia visual que complementa
   * la belleza del sonido.
   */
  const createMusicNote = (note) => {
    const id = notesIdCounter.current++;
    const noteSymbols = ['♪', '♫', '♩', '♬'];
    const randomSymbol = noteSymbols[Math.floor(Math.random() * noteSymbols.length)];
    const noteColor = note.includes('#') ? '#5F9EA0' : '#FF6347';
    
    // Encuentra la posición horizontal basada en la nota
    const noteIndex = pianoKeys.findIndex(k => k.note === note);
    const xPosition = noteIndex >= 0 ? noteIndex * 45 + 20 : Math.random() * 500;
    
    // Añadir más variedad a las notas con diferentes animaciones
    const animations = ['floatUpAndFade', 'bounce', 'spin'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    
    const newNote = {
      id,
      symbol: randomSymbol,
      color: noteColor,
      x: xPosition,
      y: 240,  // Comienza en la posición de las teclas
      opacity: 1,
      animation: randomAnimation,
      // Añadir rotación aleatoria
      rotation: Math.floor(Math.random() * 40) - 20,
      // Escala aleatoria para más variedad
      scale: 0.8 + Math.random() * 0.4
    };
    
    setMusicNotes(prev => [...prev, newNote]);
    
    // Eliminar la nota después de la animación
    setTimeout(() => {
      setMusicNotes(prev => prev.filter(note => note.id !== id));
    }, 2000);
  };

  /**
   * Crea un efecto visual de salpicadura de color cuando se toca una tecla,
   * como gotas de pintura que salpican un lienzo al ritmo de la música.
   */
  const createColorSplash = (note, keyColor) => {
    const id = splashIdCounter.current++;
    
    // Encuentra la posición basada en la nota
    const noteIndex = pianoKeys.findIndex(k => k.note === note);
    const xPosition = noteIndex >= 0 ? noteIndex * 45 + 22 : Math.random() * 500;
    
    // Colores para las salpicaduras según el tipo de tecla
    const getRandomColor = () => {
      const colors = keyColor === 'white' 
        ? ['#FF6347', '#4682B4', '#9370DB', '#3CB371', '#FFD700'] 
        : ['#00CED1', '#FF69B4', '#7B68EE', '#32CD32', '#FFA500'];
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    const newSplash = {
      id,
      color: getRandomColor(),
      x: xPosition,
      y: keyColor === 'black' ? 150 : 220,  // Ajustar según la altura de la tecla
    };
    
    setColorSplashes(prev => [...prev, newSplash]);
    
    // Eliminar la salpicadura después de la animación
    setTimeout(() => {
      setColorSplashes(prev => prev.filter(splash => splash.id !== id));
    }, 800);
  };

  /**
   * El corazón del piano: donde el silencio se convierte en música.
   * Cada nota es un latido que da vida a tus melodías,
   * transformando simples frecuencias en emociones puras.
   */
  const playNote = (note) => {
    try {
      playSound(note, 1.5);
    } catch (error) {
      console.error("Failed to play audio:", error);
    }
  };

  // Handle mouse click on piano keys
  const handleKeyClick = (note, color) => {
    playNote(note);
    setActiveKey(note);
    createMusicNote(note);
    createColorSplash(note, color);
    setTimeout(() => setActiveKey(null), 300);
  };
  
  /**
   * Como un director de orquesta que guía a sus músicos,
   * esta función teje los hilos del tiempo y la melodía
   * para dar vida a canciones que tocan el corazón.
   */
  const handlePlaySong = (song, songName) => {
    if (isPlaying) {
      if (songPlayerRef.current) {
        songPlayerRef.current.stop();
      }
      setIsPlaying(false);
      setCurrentSong(null);
      setActiveKey(null);
    } else {
      setIsPlaying(true);
      setCurrentSong(songName);
      
      songPlayerRef.current = playSong(song, (note) => {
        setActiveKey(note);
        if (note) createMusicNote(note);  // Crear notas musicales durante la reproducción de canciones
      });
      
      // When song ends
      const songDuration = song.reduce((total, { duration, delay = 0 }) => 
        total + (duration + delay) * 1000, 0);
      
      setTimeout(() => {
        setIsPlaying(false);
        setCurrentSong(null);
      }, songDuration + 500);
    }
  };

  return (
    <div className="piano-container">
      {/* La voz del piano, que susurra el nombre de cada nota */}
      {activeKey && (
        <div className="displayed-note">
          Nota: {activeKey}
        </div>
      )}
      
      {/* El escenario donde la magia musical cobra vida */}
      <div className="piano-wrapper">
        {/* El lienzo donde las notas danzan */}
        <div className="music-notes-container">
          {musicNotes.map(note => (
            <div 
              key={note.id} 
              className={`music-note ${note.animation}`}
              style={{
                left: `${note.x}px`,
                top: `${note.y}px`,
                color: note.color,
                transform: `rotate(${note.rotation}deg) scale(${note.scale})`,
              }}
            >
              {note.symbol}
            </div>
          ))}
          
          {/* Efectos de salpicadura de color */}
          {colorSplashes.map(splash => (
            <div 
              key={splash.id} 
              className="color-splash"
              style={{
                left: `${splash.x}px`,
                top: `${splash.y}px`,
                background: splash.color,
              }}
            />
          ))}
        </div>
        
        {/* El piano: un puente entre el mundo digital y el musical */}
        <div className="piano">
          {pianoKeys.map((pianoKey) => (
            <div
              key={pianoKey.note}
              className={`piano-key ${pianoKey.color} ${activeKey === pianoKey.note ? 'active' : ''}`}
              onClick={() => handleKeyClick(pianoKey.note, pianoKey.color)}
            >
              <div className="key-label">
                <div className="note">{pianoKey.note}</div>
                <div className="keyboard-key">{pianoKey.key}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* El repertorio de melodías que esperan ser descubiertas */}
      <div className="song-player">
        <button 
          className={`play-button ${isPlaying && currentSong === 'besosEnGuerra' ? 'playing' : ''}`} 
          onClick={() => handlePlaySong(besosEnGuerra, 'besosEnGuerra')}
          disabled={isPlaying && currentSong !== 'besosEnGuerra'}
        >
          {isPlaying && currentSong === 'besosEnGuerra' ? 'Detener' : 'Tocar "Besos en Guerra" - Morat'}
        </button>
        
        <button 
          className={`play-button ${isPlaying && currentSong === 'neffexRumors' ? 'playing' : ''}`} 
          onClick={() => handlePlaySong(neffexRumors, 'neffexRumors')}
          disabled={isPlaying && currentSong !== 'neffexRumors'}
        >
          {isPlaying && currentSong === 'neffexRumors' ? 'Detener' : 'Tocar "Rumors" - NEFFEX'}
        </button>
        
        <button 
          className={`play-button ${isPlaying && currentSong === 'disturbia' ? 'playing' : ''}`} 
          onClick={() => handlePlaySong(disturbia, 'disturbia')}
          disabled={isPlaying && currentSong !== 'disturbia'}
        >
          {isPlaying && currentSong === 'disturbia' ? 'Detener' : 'Tocar "Disturbia" - Rihanna'}
        </button>
      </div>
      
      {/* El laboratorio de sonido: donde la magia sonora cobra forma */}
      <SoundMixer />
      
      {/* La memoria del piano: capturando momentos musicales */}
      <AudioRecorder />
    </div>
  );
};

export default Piano;