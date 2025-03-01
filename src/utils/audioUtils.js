/**
 * Utilidades de Audio - La alquimia del sonido digital
 * 
 * Como antiguos alquimistas transformando elementos básicos en oro,
 * estas funciones convierten simples números en melodías que tocan el alma.
 * Cada frecuencia es una nota en la gran sinfonía de la tecnología y el arte.
 */

/**
 * El diccionario de las notas musicales,
 * donde cada frecuencia es una llave que abre
 * la puerta a un tono único y especial.
 */
const getNoteFrequency = (note) => {
  const notes = {
    // Primera octava
    'C1': 130.81,
    'C#1': 138.59,
    'D1': 146.83,
    'D#1': 155.56,
    'E1': 164.81,
    'F1': 174.61,
    'F#1': 185.00,
    'G1': 196.00,
    'G#1': 207.65,
    'A1': 220.00,
    'A#1': 233.08,
    'B1': 246.94,
    // Segunda octava
    'C2': 261.63,
    'C#2': 277.18,
    'D2': 293.66,
    'D#2': 311.13,
    'E2': 329.63,
    'F2': 349.23,
    'F#2': 369.99,
    'G2': 392.00,
    'G#2': 415.30,
    'A2': 440.00,
    'A#2': 466.16,
    'B2': 493.88,
    // Tercera octava (solo la primera nota)
    'C3': 523.25,
  };
  
  return notes[note] || 440;
};

// Configuración global del mezclador de audio
let audioMixerSettings = {
  waveType: 'sine',     // tipo de onda: sine, square, sawtooth, triangle
  volume: 0.3,          // volumen general (0 a 1)
  attack: 0.01,         // tiempo de ataque (segundos)
  decay: 0.1,           // tiempo de decaimiento (segundos)
  sustain: 0.7,         // nivel de sostenimiento (0 a 1)
  release: 0.5,         // tiempo de liberación (segundos)
  filterType: 'lowpass',// tipo de filtro: lowpass, highpass, bandpass, etc.
  filterFreq: 2000,     // frecuencia de corte del filtro (Hz)
  filterQ: 1,           // factor Q del filtro (resonancia)
  detune: 0,            // desafinación en centésimas (-1200 a 1200)
  delay: 0,             // retardo (0 a 1)
  reverb: 0,            // reverberación (0 a 1)
};

// Variables para el contexto de audio y grabación
let audioContext = null;
let mediaRecorder = null;
let recordedChunks = [];
let reverbNode = null;

/**
 * Como un director preparando su orquesta,
 * esta función establece el escenario
 * donde la magia del sonido cobrará vida.
 */
const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

/**
 * Actualiza la configuración del mezclador de audio
 * como un artesano que ajusta con precisión cada detalle de su obra.
 */
const updateMixerSettings = (newSettings) => {
  audioMixerSettings = { ...audioMixerSettings, ...newSettings };
  return audioMixerSettings;
};

/**
 * Obtiene la configuración actual del mezclador de audio
 * como un mapa sonoro que revela los secretos de la armonía.
 */
const getMixerSettings = () => {
  return { ...audioMixerSettings };
};

/**
 * La voz del piano digital:
 * Donde las matemáticas y la música se encuentran
 * para dar vida a cada nota que tocas.
 */
const playSound = (note, duration = 1) => {
  const context = getAudioContext();
  
  // Crear oscilador
  const oscillator = context.createOscillator();
  oscillator.type = audioMixerSettings.waveType;
  oscillator.frequency.value = getNoteFrequency(note);
  oscillator.detune.value = audioMixerSettings.detune;
  
  // Crear nodo de ganancia (para control de volumen y envolvente)
  const gainNode = context.createGain();
  
  // Crear filtro
  const filterNode = context.createBiquadFilter();
  filterNode.type = audioMixerSettings.filterType;
  filterNode.frequency.value = audioMixerSettings.filterFreq;
  filterNode.Q.value = audioMixerSettings.filterQ;
  
  // Nodo de delay si está activado
  let delayNode = null;
  if (audioMixerSettings.delay > 0) {
    delayNode = context.createDelay();
    delayNode.delayTime.value = audioMixerSettings.delay * 0.5;
    const delayGain = context.createGain();
    delayGain.gain.value = audioMixerSettings.delay * 0.5;
    
    filterNode.connect(delayNode);
    delayNode.connect(delayGain);
    delayGain.connect(filterNode);
  }

  // Preparar reverb si está activado
  let reverbGain = null;
  if (audioMixerSettings.reverb > 0) {
    if (!reverbNode) {
      // Se crearía un convolver node con un impulso de reverb en implementación completa
      // Simulamos con un simple delay para este ejemplo
      reverbNode = context.createDelay();
      reverbNode.delayTime.value = 0.1;
    }
    reverbGain = context.createGain();
    reverbGain.gain.value = audioMixerSettings.reverb;
  }
  
  // Conectar nodos
  oscillator.connect(gainNode);
  gainNode.connect(filterNode);
  
  if (reverbGain && reverbNode) {
    filterNode.connect(reverbGain);
    reverbGain.connect(reverbNode);
    reverbNode.connect(context.destination);
  }
  
  filterNode.connect(context.destination);
  
  // Configurar envolvente ADSR
  const now = context.currentTime;
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(audioMixerSettings.volume, now + audioMixerSettings.attack);
  gainNode.gain.linearRampToValueAtTime(
    audioMixerSettings.volume * audioMixerSettings.sustain, 
    now + audioMixerSettings.attack + audioMixerSettings.decay
  );
  
  // Start y stop con envolvente
  oscillator.start(now);
  
  // Release
  const releaseTime = now + duration;
  gainNode.gain.setValueAtTime(gainNode.gain.value, releaseTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, releaseTime + audioMixerSettings.release);
  oscillator.stop(releaseTime + audioMixerSettings.release);
  
  return {
    stop: () => {
      const stopTime = context.currentTime;
      gainNode.gain.cancelScheduledValues(stopTime);
      gainNode.gain.setValueAtTime(gainNode.gain.value, stopTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, stopTime + audioMixerSettings.release);
      oscillator.stop(stopTime + audioMixerSettings.release);
    }
  };
};

/**
 * El maestro del tiempo musical:
 * Como un relojero que ajusta cada engranaje,
 * esta función orquesta la secuencia perfecta
 * de notas que forman una melodía.
 */
const playSong = (noteSequence, setCurrentNote = () => {}) => {
  // Initialize audio context
  getAudioContext();
  
  let currentIndex = 0;
  let isPlaying = true;
  
  const playNextNote = () => {
    if (!isPlaying || currentIndex >= noteSequence.length) {
      setCurrentNote(null);
      return;
    }
    
    const { note, duration = 0.5, delay = 0 } = noteSequence[currentIndex];
    
    // Display the current note
    setCurrentNote(note);
    
    // Play the note
    if (note !== 'rest') {
      playSound(note, duration);
    }
    
    // Schedule next note
    currentIndex++;
    setTimeout(playNextNote, (duration + delay) * 1000);
  };
  
  // Start playing
  playNextNote();
  
  // Return controls
  return {
    stop: () => {
      isPlaying = false;
      setCurrentNote(null);
    }
  };
};

/**
 * El guardián de las memorias sonoras:
 * Capturando cada nota en el aire,
 * preservando la magia de tu interpretación
 * para que pueda ser revivida una y otra vez.
 */
const startRecording = (onStatusChange) => {
  if (!audioContext) {
    getAudioContext();
  }
  
  onStatusChange("preparando");
  
  // Crear un nodo de destino para grabar
  const destination = audioContext.createMediaStreamDestination();
  
  // Crear un MediaRecorder
  mediaRecorder = new MediaRecorder(destination.stream);
  
  // Conectar la salida principal al destino de grabación
  const mainGainNode = audioContext.createGain();
  mainGainNode.connect(audioContext.destination);
  mainGainNode.connect(destination);
  
  // Guardar esta referencia para desconectar después
  audioContext.mainGainNode = mainGainNode;
  
  // Redefinir la función playSound para usar el nodo de ganancia principal
  const originalPlaySound = window.playSound || playSound;
  window.playSound = (note, duration) => {
    const context = getAudioContext();
    
    const oscillator = context.createOscillator();
    oscillator.type = 'sine'; 
    oscillator.frequency.value = getNoteFrequency(note);
    
    const gainNode = context.createGain();
    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(context.mainGainNode || context.destination);
    
    oscillator.start(context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
    oscillator.stop(context.currentTime + duration);
    
    return {
      stop: () => {
        gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.1);
        oscillator.stop(context.currentTime + 0.1);
      }
    };
  };
  
  // Evento para recoger los datos grabados
  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };
  
  // Evento cuando la grabación se detiene
  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(recordedChunks, { type: 'audio/webm' });
    const audioUrl = URL.createObjectURL(audioBlob);
    
    onStatusChange("finalizado", audioUrl);
    
    // Restaurar la función original
    window.playSound = originalPlaySound;
    
    // Limpiar la conexión
    if (audioContext.mainGainNode) {
      audioContext.mainGainNode.disconnect();
      delete audioContext.mainGainNode;
    }
  };
  
  // Iniciar grabación
  recordedChunks = [];
  mediaRecorder.start();
  onStatusChange("grabando");
  
  return mediaRecorder;
};

/**
 * El sello final de tu obra musical:
 * Como el último trazo en un lienzo sonoro,
 * esta función culmina la captura de tu interpretación.
 */
const stopRecording = () => {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    return true;
  }
  return false;
};

/**
 * El portal del tiempo musical:
 * Permitiendo que las notas del pasado
 * vuelvan a bailar en el presente.
 */
const playRecording = (audioUrl) => {
  const audio = new Audio(audioUrl);
  audio.play();
  return audio;
};

export { 
  playSound, 
  getNoteFrequency, 
  playSong, 
  startRecording, 
  stopRecording, 
  playRecording,
  updateMixerSettings,
  getMixerSettings
};