# 📹 Guía de Subida de Vídeos - 60secondstrip

## 📁 Estructura de Carpetas

```
public/videos/
├── cities/           # Vídeos de resumen de ciudades
│   ├── madrid-es_adult.mp4
│   ├── madrid-es_kids.mp4
│   ├── barcelona-es_adult.mp4
│   ├── barcelona-es_kids.mp4
│   ├── granada-es_adult.mp4
│   ├── granada-es_kids.mp4
│   ├── sevilla-es_adult.mp4
│   ├── sevilla-es_kids.mp4
│   ├── cordoba-es_adult.mp4
│   └── cordoba-es_kids.mp4
└── pois/             # Vídeos de POIs individuales
    ├── plaza-mayor_adult.mp4
    ├── plaza-mayor_kids.mp4
    ├── palacio-real_adult.mp4
    ├── palacio-real_kids.mp4
    ├── puerta-alcala_adult.mp4
    ├── puerta-alcala_kids.mp4
    ├── retiro_adult.mp4
    ├── retiro_kids.mp4
    ├── templo-debod_adult.mp4
    ├── templo-debod_kids.mp4
    ├── sagrada-familia_adult.mp4
    ├── sagrada-familia_kids.mp4
    ├── park-guell_adult.mp4
    ├── park-guell_kids.mp4
    ├── casa-batllo_adult.mp4
    ├── casa-batllo_kids.mp4
    ├── alhambra_adult.mp4
    ├── alhambra_kids.mp4
    ├── generalife_adult.mp4
    ├── generalife_kids.mp4
    ├── catedral-sevilla_adult.mp4
    ├── catedral-sevilla_kids.mp4
    ├── alcazar-sevilla_adult.mp4
    ├── alcazar-sevilla_kids.mp4
    ├── mezquita-cordoba_adult.mp4
    ├── mezquita-cordoba_kids.mp4
    ├── alcazar-cordoba_adult.mp4
    └── alcazar-cordoba_kids.mp4
```

## 🎬 Especificaciones de Vídeos

### **Formato Requerido**
- **Extensión**: `.mp4`
- **Duración**: 60 segundos exactos
- **Resolución**: 1080x1920 (9:16 vertical) - optimizado para móvil
- **FPS**: 30 fps
- **Codec**: H.264
- **Audio**: AAC, 128kbps

### **Naming Convention**
- **Ciudades**: `{city-id}_{mode}.mp4`
  - Ejemplo: `madrid-es_adult.mp4`, `barcelona-es_kids.mp4`
- **POIs**: `{poi-id}_{mode}.mp4`
  - Ejemplo: `plaza-mayor_adult.mp4`, `sagrada-familia_kids.mp4`

## 📤 Cómo Subir Vídeos

### **Opción 1: Drag & Drop (Recomendado)**
1. Abre la carpeta `public/videos/` en Finder
2. Navega a la subcarpeta correspondiente (`cities/` o `pois/`)
3. Arrastra los vídeos desde tu carpeta local
4. Asegúrate de que el nombre del archivo coincida exactamente

### **Opción 2: Terminal**
```bash
# Para vídeos de ciudades
cp /ruta/a/tu/video.mp4 public/videos/cities/madrid-es_adult.mp4

# Para vídeos de POIs
cp /ruta/a/tu/video.mp4 public/videos/pois/plaza-mayor_adult.mp4
```

### **Opción 3: VS Code**
1. Abre la carpeta `public/videos/` en VS Code
2. Haz clic derecho en la carpeta correspondiente
3. Selecciona "Upload..." o arrastra el archivo

## 🔄 Actualizar URLs en el Manifest

Una vez subidos los vídeos, actualiza el `manifest.json`:

```json
{
  "videoUrlAdult": "/videos/pois/plaza-mayor_adult.mp4",
  "videoUrlKids": "/videos/pois/plaza-mayor_kids.mp4"
}
```

## ✅ Checklist de Verificación

- [ ] Vídeo dura exactamente 60 segundos
- [ ] Resolución 1080x1920 (vertical)
- [ ] Nombre del archivo correcto
- [ ] Ubicado en la carpeta correcta
- [ ] URL actualizada en manifest.json
- [ ] Vídeo se reproduce correctamente en el navegador

## 🚀 Después de Subir

1. **Commit y Push**:
   ```bash
   git add .
   git commit -m "feat: add video content for [city/poi]"
   git push origin main
   ```

2. **Verificar en Producción**:
   - La app se desplegará automáticamente en Netlify
   - Los vídeos estarán disponibles en `/videos/`

## 🎯 Orden Recomendado de Subida

1. **Madrid** (5 POIs + ciudad)
2. **Barcelona** (3 POIs + ciudad)  
3. **Granada** (2 POIs + ciudad)
4. **Sevilla** (2 POIs + ciudad)
5. **Córdoba** (2 POIs + ciudad)

## 📱 Optimización Móvil

Los vídeos están optimizados para:
- **Carga rápida**: Máximo 10MB por vídeo
- **Reproducción fluida**: 30fps constante
- **Calidad visual**: 1080p para pantallas móviles
- **Audio claro**: 128kbps AAC

## 🔧 Troubleshooting

### **Vídeo no se reproduce**
- Verifica que la URL en manifest.json sea correcta
- Asegúrate de que el archivo esté en la carpeta correcta
- Comprueba que el formato sea MP4

### **Vídeo muy pesado**
- Reduce la calidad a 720p si es necesario
- Comprime el audio a 96kbps
- Usa un compresor de vídeo online

### **Vídeo no dura 60s**
- Usa un editor de vídeo para ajustar la duración
- Añade frames al final o corta si es necesario

