# 🎹 Piano Virtual

Un piano virtual interactivo creado con React que combina la magia de la música con la tecnología moderna. Este proyecto ofrece una experiencia musical completa con características avanzadas de síntesis de sonido y grabación.

## ✨ Características

### 🎵 Piano Interactivo
- Teclado virtual con 2 octavas y media (desde C1 hasta C3)
- Teclas blancas y negras con animaciones de presión
- Control mediante teclado del ordenador o ratón
- Visualización de notas musicales flotantes al tocar
- Indicador de nota actual

### 🎛️ Mezclador de Sonido
- **Formas de Onda**: Sine, Square, Sawtooth, Triangle
- **Filtros de Audio**: 
  - Tipos: Lowpass, Highpass, Bandpass, Notch, Allpass
  - Control de frecuencia y resonancia
- **Envolvente ADSR**:
  - Attack (Ataque)
  - Decay (Decaimiento)
  - Sustain (Sostenimiento)
  - Release (Liberación)
- **Efectos**:
  - Delay
  - Reverb
  - Detune (Desafinación)
- **Preajustes**:
  - Piano acústico
  - Sintetizador
  - Órgano

### 🎼 Reproductor de Canciones
- Canciones preinstaladas:
  - "Besos en Guerra" - Morat
  - "Rumors" - NEFFEX
  - "Disturbia" - Rihanna
- Control de reproducción
- Visualización de notas durante la reproducción

### 🎙️ Grabación de Audio
- Grabación en tiempo real
- Reproducción de grabaciones
- Descarga de grabaciones en formato de audio
- Interfaz intuitiva para gestionar grabaciones

## 🚀 Tecnologías Utilizadas

- React
- Web Audio API
- MediaRecorder API
- CSS3 con animaciones
- JavaScript ES6+
- Vite como bundler

## 📖 Cómo Usar

1. **Tocar el Piano**:
   - Usa el ratón para hacer clic en las teclas
   - O utiliza el teclado del ordenador:
     - Primera octava: Z-M
     - Segunda octava: Q-U
     - Teclas negras: S,D,G,H,J (primera octava) y 2,3,5,6,7 (segunda octava)

2. **Mezclador de Sonido**:
   - Haz clic en "Mostrar Mezclador" para acceder a los controles
   - Ajusta los parámetros en tiempo real
   - Prueba los diferentes preajustes

3. **Reproducir Canciones**:
   - Selecciona una canción de la lista
   - Presiona el botón de reproducción
   - Observa la visualización de notas en tiempo real

4. **Grabar tu Interpretación**:
   - Haz clic en el botón de grabación
   - Toca tu melodía
   - Detén la grabación cuando termines
   - Escucha, descarga o comienza una nueva grabación

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Entrar al directorio
cd piano

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

## 🎨 Personalización

El proyecto está diseñado para ser fácilmente personalizable:

- Añade más octavas modificando el array `pianoKeys` en `Piano.jsx`
- Crea nuevos preajustes en el mezclador de sonido
- Añade nuevas canciones en el archivo `songs.js`
- Personaliza los estilos en los archivos CSS correspondientes

## 🌐 Compatibilidad

El piano virtual funciona mejor en navegadores modernos que soporten:
- Web Audio API
- MediaRecorder API
- ES6+ JavaScript

## 📝 Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## ✍️ Autor

[Ale]
[Enlaces a tus redes sociales o sitio web]

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.

1. Haz Fork del proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🌟 Agradecimientos

- Inspirado en pianos virtuales y sintetizadores profesionales
- Gracias a la comunidad de React por sus recursos y herramientas
- Agradecimientos especiales a todos los contribuidores

---

Hecho con ❤️ y mucha 🎵
