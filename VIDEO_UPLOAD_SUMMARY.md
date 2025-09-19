# 🎬 Resumen: Subida de Vídeos - 60secondstrip

## 📋 **¿Qué necesitas hacer?**

### **1. Preparar tus vídeos**
- **Duración**: 60 segundos exactos
- **Formato**: MP4, 1080x1920 (vertical)
- **Nombres**: Seguir la convención `{id}_{mode}.mp4`

### **2. Subir vídeos**
```bash
# Opción A: Arrastrar y soltar
# Abre Finder → public/videos/ → arrastra tus vídeos

# Opción B: Terminal
cp /ruta/a/tu/video.mp4 public/videos/pois/plaza-mayor_adult.mp4
```

### **3. Actualizar URLs automáticamente**
```bash
node update-video-urls.js
```

### **4. Commit y deploy**
```bash
git add .
git commit -m "feat: add video content"
git push origin main
```

## 📁 **Estructura de Carpetas Creada**

```
public/videos/
├── cities/           # Vídeos de resumen de ciudades
└── pois/             # Vídeos de POIs individuales
```

## 🛠️ **Scripts Disponibles**

1. **`update-video-urls.js`** - Actualiza automáticamente las URLs en manifest.json
2. **`generate-test-videos.sh`** - Genera vídeos de prueba (requiere FFmpeg)
3. **`VIDEOS_UPLOAD.md`** - Guía completa de subida

## 📝 **Lista de Vídeos Necesarios**

### **Ciudades (10 vídeos)**
- `madrid-es_adult.mp4` / `madrid-es_kids.mp4`
- `barcelona-es_adult.mp4` / `barcelona-es_kids.mp4`
- `granada-es_adult.mp4` / `granada-es_kids.mp4`
- `sevilla-es_adult.mp4` / `sevilla-es_kids.mp4`
- `cordoba-es_adult.mp4` / `cordoba-es_kids.mp4`

### **POIs (30 vídeos)**
- **Madrid**: plaza-mayor, palacio-real, puerta-alcala, retiro, templo-debod
- **Barcelona**: sagrada-familia, park-guell, casa-batllo
- **Granada**: alhambra, generalife
- **Sevilla**: catedral-sevilla, alcazar-sevilla
- **Córdoba**: mezquita-cordoba, alcazar-cordoba

## ⚡ **Proceso Rápido**

1. **Sube un vídeo** → `public/videos/pois/plaza-mayor_adult.mp4`
2. **Ejecuta script** → `node update-video-urls.js`
3. **Verifica** → El manifest se actualiza automáticamente
4. **Commit** → `git add . && git commit -m "add video" && git push`

## 🎯 **Orden Recomendado**

1. **Madrid** (5 POIs + ciudad) - 12 vídeos
2. **Barcelona** (3 POIs + ciudad) - 8 vídeos
3. **Granada** (2 POIs + ciudad) - 6 vídeos
4. **Sevilla** (2 POIs + ciudad) - 6 vídeos
5. **Córdoba** (2 POIs + ciudad) - 6 vídeos

**Total: 38 vídeos** (19 adulto + 19 infantil)

## ✅ **Verificación**

Después de subir cada vídeo:
- ✅ Archivo en la carpeta correcta
- ✅ Nombre correcto
- ✅ URL actualizada en manifest
- ✅ Vídeo se reproduce en la app

## 🚨 **Importante**

- Los vídeos deben ser **exactamente 60 segundos**
- Formato **MP4 vertical** (1080x1920)
- **No olvides** ejecutar `node update-video-urls.js` después de cada subida
- Los vídeos se despliegan automáticamente en Netlify
