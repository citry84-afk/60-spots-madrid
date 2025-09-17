#!/bin/bash

echo "🍎 Setup 60 Spots Madrid para GitHub + Netlify"
echo "============================================="

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Instala Node.js 18+ desde https://nodejs.org"
    exit 1
fi

# Verificar Git
if ! command -v git &> /dev/null; then
    echo "❌ Git no está instalado. Instala Git desde https://git-scm.com"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"
echo "✅ Git $(git --version | cut -d' ' -f3) detectado"

# Instalar dependencias
echo ""
echo "📦 Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias"
    exit 1
fi

echo "✅ Dependencias instaladas"

# Inicializar Git si no está inicializado
if [ ! -d ".git" ]; then
    echo ""
    echo "🔧 Inicializando repositorio Git..."
    git init
fi

# Configurar Git si no está configurado
if [ -z "$(git config user.name)" ]; then
    echo ""
    echo "⚙️ Configurando Git..."
    read -p "Tu nombre: " GIT_NAME
    read -p "Tu email: " GIT_EMAIL
    git config user.name "$GIT_NAME"
    git config user.email "$GIT_EMAIL"
fi

# Añadir archivos
echo ""
echo "📝 Añadiendo archivos al repositorio..."
git add .

# Primer commit
echo "💾 Haciendo primer commit..."
git commit -m "🍎 Initial commit: 60 Spots Madrid PWA

✨ Características:
- PWA completa con Service Worker
- Geolocalización automática
- 25 spots de Madrid con datos reales
- Modo Adultos/Niños
- Diseño iOS con glassmorphism
- Videos de 60 segundos
- Mapa interactivo con Leaflet
- Offline-first architecture

🚀 Tecnologías:
- Next.js 14 + TypeScript
- Tailwind CSS + Framer Motion
- Leaflet maps + Geolocation API
- PWA manifest + Service Worker"

echo ""
echo "🎉 ¡Setup completado!"
echo ""
echo "📋 Próximos pasos:"
echo ""
echo "1. Crear repositorio en GitHub:"
echo "   - Ve a https://github.com/new"
echo "   - Nombre: 60-spots-madrid"
echo "   - Descripción: PWA de viajes para descubrir Madrid en 60 segundos"
echo "   - Marcar como Público"
echo "   - NO inicializar con README"
echo ""
echo "2. Conectar repositorio local:"
echo "   git remote add origin https://github.com/TU-USUARIO/60-spots-madrid.git"
echo "   git push -u origin main"
echo ""
echo "3. Deploy en Netlify:"
echo "   - Ve a https://netlify.com"
echo "   - Click 'New site from Git'"
echo "   - Selecciona tu repositorio"
echo "   - Build command: npm run build"
echo "   - Publish directory: out"
echo "   - Node version: 18"
echo ""
echo "4. O usar el script de deploy:"
echo "   ./deploy.sh"
echo ""
echo "🌐 Tu app estará disponible en: https://tu-sitio.netlify.app"
echo ""
echo "📱 Características PWA:"
echo "  • Instalable desde navegador"
echo "  • Funciona offline"
echo "  • Geolocalización automática"
echo "  • 25 spots de Madrid"
echo "  • Diseño iOS con glassmorphism"
echo "  • Videos de 60 segundos"
echo ""
echo "¡Disfruta explorando Madrid! 🏛️✨"
