#!/bin/bash

# Script para generar vídeos de prueba usando FFmpeg
# Uso: ./generate-test-videos.sh

echo "🎬 Generando vídeos de prueba para 60secondstrip..."

# Crear directorios si no existen
mkdir -p public/videos/cities
mkdir -p public/videos/pois

# Función para generar vídeo de prueba
generate_test_video() {
    local output_path="$1"
    local text="$2"
    local duration=60
    
    echo "Generando: $output_path"
    
    # Crear vídeo con texto centrado
    ffmpeg -f lavfi -i color=c=blue:size=1080x1920:duration=$duration \
           -vf "drawtext=text='$text':fontsize=60:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2" \
           -c:v libx264 -preset fast -crf 23 \
           -c:a aac -b:a 128k \
           -y "$output_path" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ Generado: $output_path"
    else
        echo "❌ Error generando: $output_path"
    fi
}

# Generar vídeos de ciudades
echo "🏛️ Generando vídeos de ciudades..."
generate_test_video "public/videos/cities/madrid-es_adult.mp4" "Madrid - Versión Adulta"
generate_test_video "public/videos/cities/madrid-es_kids.mp4" "Madrid - Versión Infantil"
generate_test_video "public/videos/cities/barcelona-es_adult.mp4" "Barcelona - Versión Adulta"
generate_test_video "public/videos/cities/barcelona-es_kids.mp4" "Barcelona - Versión Infantil"
generate_test_video "public/videos/cities/granada-es_adult.mp4" "Granada - Versión Adulta"
generate_test_video "public/videos/cities/granada-es_kids.mp4" "Granada - Versión Infantil"
generate_test_video "public/videos/cities/sevilla-es_adult.mp4" "Sevilla - Versión Adulta"
generate_test_video "public/videos/cities/sevilla-es_kids.mp4" "Sevilla - Versión Infantil"
generate_test_video "public/videos/cities/cordoba-es_adult.mp4" "Córdoba - Versión Adulta"
generate_test_video "public/videos/cities/cordoba-es_kids.mp4" "Córdoba - Versión Infantil"

# Generar vídeos de POIs principales
echo "📍 Generando vídeos de POIs..."
generate_test_video "public/videos/pois/plaza-mayor_adult.mp4" "Plaza Mayor - Adulta"
generate_test_video "public/videos/pois/plaza-mayor_kids.mp4" "Plaza Mayor - Infantil"
generate_test_video "public/videos/pois/palacio-real_adult.mp4" "Palacio Real - Adulta"
generate_test_video "public/videos/pois/palacio-real_kids.mp4" "Palacio Real - Infantil"
generate_test_video "public/videos/pois/sagrada-familia_adult.mp4" "Sagrada Familia - Adulta"
generate_test_video "public/videos/pois/sagrada-familia_kids.mp4" "Sagrada Familia - Infantil"
generate_test_video "public/videos/pois/alhambra_adult.mp4" "Alhambra - Adulta"
generate_test_video "public/videos/pois/alhambra_kids.mp4" "Alhambra - Infantil"

echo "🎉 ¡Vídeos de prueba generados!"
echo "📁 Ubicación: public/videos/"
echo "🔄 Ejecuta: node update-video-urls.js para actualizar el manifest"

