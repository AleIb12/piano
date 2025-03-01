import React, { useState, useEffect } from 'react';
import { updateMixerSettings, getMixerSettings } from '../utils/audioUtils';
import '../styles/SoundMixer.css';

/**
 * Mezclador de Sonido - El laboratorio donde se esculpe el sonido
 * 
 * Como un alquimista musical que combina elementos sonoros,
 * este componente te permite dar forma a cada nota,
 * transformando simples vibraciones en experiencias únicas
 * que reflejan tu propio estilo y visión musical.
 */
const SoundMixer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(getMixerSettings());
  
  // Los tipos de ondas disponibles, cada una con su propia personalidad
  const waveTypes = ['sine', 'square', 'sawtooth', 'triangle'];
  
  // Tipos de filtros, como lentes que revelan diferentes aspectos del sonido
  const filterTypes = ['lowpass', 'highpass', 'bandpass', 'notch', 'allpass'];

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

  // Para actualizar la configuración desde fuera del componente
  useEffect(() => {
    // Sincronizar con la configuración global al montar
    const currentSettings = getMixerSettings();
    setSettings(currentSettings);
  }, []);

  return (
    <div className="sound-mixer-container">
      <button 
        className={`mixer-toggle-button ${isOpen ? 'open' : ''}`}
        onClick={toggleMixer}
      >
        {isOpen ? 'Ocultar Mezclador' : 'Mostrar Mezclador'} 🎛️
      </button>
      
      {isOpen && (
        <div className="sound-mixer">
          <h3 className="mixer-title">Mezclador de Sonido</h3>
          
          <div className="mixer-section">
            <h4>Forma de Onda</h4>
            <div className="wave-selector">
              {waveTypes.map((type) => (
                <button
                  key={type}
                  className={`wave-button ${settings.waveType === type ? 'active' : ''}`}
                  onClick={() => handleSettingChange('waveType', type)}
                  title={`Onda ${type}`}
                >
                  {type === 'sine' && '∿'}
                  {type === 'square' && '⊓⊔'}
                  {type === 'sawtooth' && '⋀⋁'}
                  {type === 'triangle' && '△▽'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mixer-controls">
            <div className="mixer-control">
              <label htmlFor="volume">Volumen</label>
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
              <label htmlFor="filterType">Tipo de Filtro</label>
              <select 
                id="filterType" 
                value={settings.filterType}
                onChange={(e) => handleSettingChange('filterType', e.target.value)}
              >
                {filterTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="mixer-control">
              <label htmlFor="filterFreq">Frecuencia del Filtro</label>
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
              <label htmlFor="filterQ">Resonancia (Q)</label>
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
            <h4>Envolvente ADSR</h4>
            <div className="mixer-controls">
              <div className="mixer-control">
                <label htmlFor="attack">Ataque</label>
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
                <label htmlFor="decay">Decaimiento</label>
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
                <label htmlFor="sustain">Sostenimiento</label>
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
                <label htmlFor="release">Liberación</label>
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
            <h4>Efectos</h4>
            <div className="mixer-controls">
              <div className="mixer-control">
                <label htmlFor="detune">Desafinación</label>
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
                <label htmlFor="delay">Delay</label>
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
                <label htmlFor="reverb">Reverb</label>
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
              Piano
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
              Sintetizador
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
              Órgano
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoundMixer;