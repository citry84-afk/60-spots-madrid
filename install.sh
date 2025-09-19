#!/bin/bash

echo "🍎 Instalando 60 Spots - Madrid PWA"
echo "=================================="

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Instala Node.js 18+ desde https://nodejs.org"
    exit 1
fi

# Verificar versión de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Se requiere Node.js 18 o superior. Versión actual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencias instaladas correctamente"
else
    echo "❌ Error al instalar dependencias"
    exit 1
fi

# Crear directorio de iconos si no existe
mkdir -p public

echo ""
echo "🚀 ¡Instalación completada!"
echo ""
echo "Para iniciar la app:"
echo "  npm run dev"
echo ""
echo "Para construir para producción:"
echo "  npm run build"
echo "  npm start"
echo ""
echo "🌐 La app estará disponible en: http://localhost:3000"
echo ""
echo "📱 Características:"
echo "  • PWA completa (instalable)"
echo "  • Geolocalización automática"
echo "  • 25 spots de Madrid"
echo "  • Modo Adultos/Niños"
echo "  • Diseño iOS con glassmorphism"
echo "  • Videos de 60 segundos"
echo ""
echo "¡Disfruta explorando Madrid! 🏛️"

