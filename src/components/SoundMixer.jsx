import React, { useState, useEffect } from 'react';
import { updateMixerSettings, getMixerSettings } from '../utils/audioUtils';
import '../styles/SoundMixer.css';

/**
 * Mezclador de Sonido Profesional
 * Panel de control avanzado para la manipulación de audio en tiempo real
 */
const SoundMixer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(getMixerSettings());
  
  // Tipos de ondas disponibles con sus símbolos únicos
  const waveTypes = [
    { type: 'sine', symbol: '∿', name: 'Senoidal' },
    { type: 'square', symbol: '⊓⊔', name: 'Cuadrada' },
    { type: 'sawtooth', symbol: '⋀⋁', name: 'Diente de sierra' },
    { type: 'triangle', symbol: '△▽', name: 'Triangular' }
  ];
  
  // Tipos de filtros disponibles
  const filterTypes = [
    { type: 'lowpass', name: 'Paso bajo' },
    { type: 'highpass', name: 'Paso alto' },
    { type: 'bandpass', name: 'Paso banda' },
    { type: 'notch', name: 'Rechazo' },
    { type: 'allpass', name: 'Paso todo' }
  ];

  // Aplicar cambios cuando se modifica un control
  const handleSettingChange = (setting, value) => {
    // Convertir a número si es necesario
    if (typeof settings[setting] === 'number') {
      value = parseFloat(value);
    }
    
    const newSettings = { ...settings, [setting]: value };
    setSettings(newSettings);
    updateMixerSettings(newSettings);
  };

  // Alternar la visibilidad del panel de mezcla
  const toggleMixer = () => {
    setIsOpen(!isOpen);
  };

  // Resetear configuración a valores por defecto
  const resetToDefaults = () => {
    const defaultSettings = {
      waveType: 'sine',
      volume: 0.3,
      attack: 0.1,
      decay: 0.1,
      sustain: 0.7,
      release: 0.3,
      filterType: 'lowpass',
      filterFreq: 1000,
      filterQ: 1,
      detune: 0,
      delay: 0,
      reverb: 0
    };
    setSettings(defaultSettings);
    updateMixerSettings(defaultSettings);
  };

  // Sincronizar configuración al montar el componente
  useEffect(() => {
    const currentSettings = getMixerSettings();
    setSettings(currentSettings);
  }, []);

  return (
    <div className="sound-mixer-container">
      <button 
        className={`mixer-toggle-button ${isOpen ? 'open' : ''}`}
        onClick={toggleMixer}
      >
        {isOpen ? '🔽 Ocultar Mezclador' : '🎛️ Mostrar Mezclador'}
      </button>
      
      {isOpen && (
        <div className="sound-mixer">
          <div className="mixer-header">
            <h3 className="mixer-title">Mezclador de Audio</h3>
            <button className="reset-button" onClick={resetToDefaults}>
              ↻ Resetear
            </button>
          </div>
          
          <div className="mixer-section">
            <h4>🌊 Forma de Onda</h4>
            <div className="wave-selector">
              {waveTypes.map((wave) => (
                <button
                  key={wave.type}
                  className={`wave-button ${settings.waveType === wave.type ? 'active' : ''}`}
                  onClick={() => handleSettingChange('waveType', wave.type)}
                  title={wave.name}
                >
                  {wave.symbol}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mixer-controls">
            <div className="mixer-control">
              <label htmlFor="volume">🔊 Volumen</label>
              <input
                id="volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={settings.volume}
                onChange={(e) => handleSettingChange('volume', e.target.value)}
              />
              <span className="control-value">{Math.round(settings.volume * 100)}%</span>
            </div>
            
            <div className="mixer-control">
              <label htmlFor="filterType">🎛️ Tipo de Filtro</label>
              <select 
                id="filterType" 
                value={settings.filterType}
                onChange={(e) => handleSettingChange('filterType', e.target.value)}
              >
                {filterTypes.map(filter => (
                  <option key={filter.type} value={filter.type}>{filter.name}</option>
                ))}
              </select>
            </div>
            
            <div className="mixer-control">
              <label htmlFor="filterFreq">📶 Frecuencia del Filtro</label>
              <input
                id="filterFreq"
                type="range"
                min="20"
                max="20000"
                step="1"
                value={settings.filterFreq}
                onChange={(e) => handleSettingChange('filterFreq', e.target.value)}
              />
              <span className="control-value">{settings.filterFreq} Hz</span>
            </div>
            
            <div className="mixer-control">
              <label htmlFor="filterQ">🎯 Resonancia (Q)</label>
              <input
                id="filterQ"
                type="range"
                min="0.1"
                max="20"
                step="0.1"
                value={settings.filterQ}
                onChange={(e) => handleSettingChange('filterQ', e.target.value)}
              />
              <span className="control-value">{settings.filterQ}</span>
            </div>
          </div>
          
          <div className="mixer-section">
            <h4>📈 Envolvente ADSR</h4>
            <div className="mixer-controls">
              <div className="mixer-control">
                <label htmlFor="attack">⚡ Ataque</label>
                <input
                  id="attack"
                  type="range"
                  min="0.01"
                  max="2"
                  step="0.01"
                  value={settings.attack}
                  onChange={(e) => handleSettingChange('attack', e.target.value)}
                />
                <span className="control-value">{settings.attack}s</span>
              </div>
              
              <div className="mixer-control">
                <label htmlFor="decay">📉 Decaimiento</label>
                <input
                  id="decay"
                  type="range"
                  min="0.01"
                  max="2"
                  step="0.01"
                  value={settings.decay}
                  onChange={(e) => handleSettingChange('decay', e.target.value)}
                />
                <span className="control-value">{settings.decay}s</span>
              </div>
              
              <div className="mixer-control">
                <label htmlFor="sustain">🔄 Sostenimiento</label>
                <input
                  id="sustain"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={settings.sustain}
                  onChange={(e) => handleSettingChange('sustain', e.target.value)}
                />
                <span className="control-value">{Math.round(settings.sustain * 100)}%</span>
              </div>
              
              <div className="mixer-control">
                <label htmlFor="release">🔚 Liberación</label>
                <input
                  id="release"
                  type="range"
                  min="0.01"
                  max="5"
                  step="0.01"
                  value={settings.release}
                  onChange={(e) => handleSettingChange('release', e.target.value)}
                />
                <span className="control-value">{settings.release}s</span>
              </div>
            </div>
          </div>
          
          <div className="mixer-section">
            <h4>✨ Efectos</h4>
            <div className="mixer-controls">
              <div className="mixer-control">
                <label htmlFor="detune">🎵 Desafinación</label>
                <input
                  id="detune"
                  type="range"
                  min="-100"
                  max="100"
                  step="1"
                  value={settings.detune}
                  onChange={(e) => handleSettingChange('detune', e.target.value)}
                />
                <span className="control-value">{settings.detune} cents</span>
              </div>
              
              <div className="mixer-control">
                <label htmlFor="delay">⏱️ Delay</label>
                <input
                  id="delay"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={settings.delay}
                  onChange={(e) => handleSettingChange('delay', e.target.value)}
                />
                <span className="control-value">{Math.round(settings.delay * 100)}%</span>
              </div>
              
              <div className="mixer-control">
                <label htmlFor="reverb">🌊 Reverb</label>
                <input
                  id="reverb"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={settings.reverb}
                  onChange={(e) => handleSettingChange('reverb', e.target.value)}
                />
                <span className="control-value">{Math.round(settings.reverb * 100)}%</span>
              </div>
            </div>
          </div>
          
          <div className="mixer-presets">
            <h4 style={{textAlign: 'center', marginBottom: '1rem', color: '#f8f9fa'}}>🎹 Preajustes</h4>
            <div className="preset-buttons">
              <button 
                className="preset-button"
                onClick={() => {
                  const pianoPreset = {
                    waveType: 'triangle',
                    volume: 0.4,
                    attack: 0.01,
                    decay: 0.2,
                    sustain: 0.8,
                    release: 0.5,
                    filterType: 'lowpass',
                    filterFreq: 5000,
                    filterQ: 1,
                    detune: 0,
                    delay: 0,
                    reverb: 0.1
                  };
                  setSettings(pianoPreset);
                  updateMixerSettings(pianoPreset);
                }}
              >
                🎹 Piano
              </button>
              <button 
                className="preset-button"
                onClick={() => {
                  const synth1Preset = {
                    waveType: 'sawtooth',
                    volume: 0.3,
                    attack: 0.1,
                    decay: 0.3,
                    sustain: 0.6,
                    release: 1,
                    filterType: 'lowpass',
                    filterFreq: 2000,
                    filterQ: 5,
                    detune: 10,
                    delay: 0.2,
                    reverb: 0.3
                  };
                  setSettings(synth1Preset);
                  updateMixerSettings(synth1Preset);
                }}
              >
                🎛️ Sintetizador
              </button>
              <button 
                className="preset-button"
                onClick={() => {
                  const organPreset = {
                    waveType: 'square',
                    volume: 0.35,
                    attack: 0.05,
                    decay: 0.1,
                    sustain: 1,
                    release: 0.1,
                    filterType: 'lowpass',
                    filterFreq: 3000,
                    filterQ: 2,
                    detune: 0,
                    delay: 0,
                    reverb: 0.4
                  };
                  setSettings(organPreset);
                  updateMixerSettings(organPreset);
                }}
              >
                🎵 Órgano
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoundMixer;