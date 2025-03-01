import React, { useState, useRef } from 'react';
import { startRecording, stopRecording, playRecording } from '../utils/audioUtils';
import '../styles/AudioRecorder.css';

/**
 * AudioRecorder - El guardián de los momentos musicales
 * 
 * Como un artista que captura la esencia del momento en un lienzo,
 * este componente preserva las melodías que nacen de tu inspiración.
 * Cada grabación es un recuerdo musical, una historia contada a través
 * de las teclas del piano, lista para ser revivida una y otra vez.
 */
const AudioRecorder = () => {
  const [recordingStatus, setRecordingStatus] = useState("inactivo");
  const [audioUrl, setAudioUrl] = useState(null);
  const [duration, setDuration] = useState(0);
  const timerRef = useRef(null);
  const audioPlayerRef = useRef(null);
  
  /**
   * Como un director que marca el compás del tiempo,
   * esta función registra cada segundo de tu interpretación,
   * transformando el tiempo en un testigo de tu creatividad.
   */
  const handleStatusChange = (status, url = null) => {
    setRecordingStatus(status);
    
    if (status === "grabando") {
      // Iniciar temporizador para mostrar duración
      setDuration(0);
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } else if (status === "finalizado" && url) {
      // Limpiar temporizador y guardar URL del audio
      clearInterval(timerRef.current);
      setAudioUrl(url);
    } else if (status === "inactivo") {
      // Reiniciar estado
      clearInterval(timerRef.current);
      setDuration(0);
    }
  };
  
  /**
   * El momento en que el silencio se convierte en lienzo,
   * listo para ser pintado con tus notas musicales.
   */
  const handleStartRecording = () => {
    startRecording(handleStatusChange);
  };
  
  /**
   * Como el último trazo en una obra maestra,
   * esta función cierra el telón de tu interpretación,
   * preparándola para ser compartida con el mundo.
   */
  const handleStopRecording = () => {
    if (stopRecording()) {
      // La grabación se detendrá y el callback handleStatusChange será llamado
    }
  };
  
  // Reproducir grabación
  const handlePlayRecording = () => {
    if (audioUrl) {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      audioPlayerRef.current = playRecording(audioUrl);
    }
  };
  
  // Descargar grabación
  const handleDownload = () => {
    if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = `piano-grabacion-${new Date().toISOString().slice(0,19).replace(/:/g, '-')}.webm`;
      a.click();
    }
  };
  
  // Formatear duración en MM:SS
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="audio-recorder">
      {/* El panel de control de tus memorias musicales */}
      <div className="recorder-controls">
        {recordingStatus === "inactivo" && (
          <button 
            className="record-button" 
            onClick={handleStartRecording}
            aria-label="Iniciar grabación"
          >
            <span className="record-icon"></span>
            Grabar
          </button>
        )}
        
        {recordingStatus === "grabando" && (
          <button 
            className="stop-button" 
            onClick={handleStopRecording}
            aria-label="Detener grabación"
          >
            <span className="stop-icon"></span>
            Detener ({formatDuration(duration)})
          </button>
        )}
        
        {recordingStatus === "preparando" && (
          <button 
            className="record-button preparing" 
            disabled
            aria-label="Preparando grabación"
          >
            <span className="preparing-icon"></span>
            Preparando...
          </button>
        )}
      </div>
      
      {/* El tesoro de tu interpretación */}
      {audioUrl && recordingStatus === "finalizado" && (
        <div className="recording-result">
          <div className="recording-info">
            <span>Grabación completada ({formatDuration(duration)})</span>
          </div>
          <div className="recording-actions">
            <button 
              className="play-button"
              onClick={handlePlayRecording}
              aria-label="Reproducir grabación"
            >
              <span className="play-icon"></span>
              Reproducir
            </button>
            <button 
              className="download-button"
              onClick={handleDownload}
              aria-label="Descargar grabación"
            >
              <span className="download-icon"></span>
              Descargar
            </button>
            <button 
              className="new-recording-button"
              onClick={() => handleStatusChange("inactivo")}
              aria-label="Nueva grabación"
            >
              <span className="new-recording-icon"></span>
              Nueva grabación
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;