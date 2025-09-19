#!/usr/bin/env node

/**
 * Script para actualizar automáticamente las URLs de vídeos en manifest.json
 * Uso: node update-video-urls.js
 */

const fs = require('fs');
const path = require('path');

const MANIFEST_PATH = './public/content/manifest.json';
const VIDEOS_DIR = './public/videos';

function updateVideoUrls() {
  try {
    // Leer el manifest
    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    
    // Función para verificar si existe un vídeo
    function videoExists(category, filename) {
      const videoPath = path.join(VIDEOS_DIR, category, filename);
      return fs.existsSync(videoPath);
    }
    
    // Función para generar URL de vídeo
    function getVideoUrl(category, filename) {
      return `/videos/${category}/${filename}`;
    }
    
    let updated = 0;
    
    // Actualizar ciudades
    manifest.cities.forEach(city => {
      const cityId = city.id;
      
      // Vídeo adulto
      const adultVideo = `${cityId}_adult.mp4`;
      if (videoExists('cities', adultVideo)) {
        city.videoUrlAdult = getVideoUrl('cities', adultVideo);
        console.log(`✅ Actualizado: ${city.name} (adulto)`);
        updated++;
      }
      
      // Vídeo infantil
      const kidsVideo = `${cityId}_kids.mp4`;
      if (videoExists('cities', kidsVideo)) {
        city.videoUrlKids = getVideoUrl('cities', kidsVideo);
        console.log(`✅ Actualizado: ${city.name} (infantil)`);
        updated++;
      }
      
      // Actualizar POIs de la ciudad
      city.pois.forEach(poi => {
        const poiId = poi.id;
        
        // Vídeo adulto
        const adultVideo = `${poiId}_adult.mp4`;
        if (videoExists('pois', adultVideo)) {
          poi.videoUrlAdult = getVideoUrl('pois', adultVideo);
          console.log(`✅ Actualizado: ${poi.name} (adulto)`);
          updated++;
        }
        
        // Vídeo infantil
        const kidsVideo = `${poiId}_kids.mp4`;
        if (videoExists('pois', kidsVideo)) {
          poi.videoUrlKids = getVideoUrl('pois', kidsVideo);
          console.log(`✅ Actualizado: ${poi.name} (infantil)`);
          updated++;
        }
      });
    });
    
    // Guardar el manifest actualizado
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    
    console.log(`\n🎉 Actualización completada: ${updated} vídeos encontrados`);
    console.log(`📁 Manifest guardado en: ${MANIFEST_PATH}`);
    
  } catch (error) {
    console.error('❌ Error actualizando URLs:', error.message);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  updateVideoUrls();
}

module.exports = { updateVideoUrls };
