#!/bin/bash

echo "🚀 Deploy 60 Spots Madrid a Netlify"
echo "=================================="

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ No se encontró package.json. Ejecuta desde el directorio del proyecto."
    exit 1
fi

# Verificar Git
if ! git status &> /dev/null; then
    echo "❌ No es un repositorio Git. Ejecuta 'git init' primero."
    exit 1
fi

# Verificar cambios pendientes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Hay cambios pendientes. ¿Quieres hacer commit?"
    read -p "¿Continuar? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📦 Haciendo commit de cambios..."
        git add .
        git commit -m "🚀 Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
    else
        echo "❌ Deploy cancelado"
        exit 1
    fi
fi

# Verificar que tenemos remote origin
if ! git remote get-url origin &> /dev/null; then
    echo "❌ No hay remote origin configurado."
    echo "Configura el remote con:"
    echo "git remote add origin https://github.com/TU-USUARIO/60-spots-madrid.git"
    exit 1
fi

# Push a GitHub
echo "📤 Subiendo a GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Código subido a GitHub correctamente"
    echo ""
    echo "🌐 Próximos pasos:"
    echo "1. Ve a https://netlify.com"
    echo "2. Click 'New site from Git'"
    echo "3. Selecciona tu repositorio de GitHub"
    echo "4. Configuración:"
    echo "   - Build command: npm run build"
    echo "   - Publish directory: .next"
    echo "   - Node version: 18"
    echo "5. Click 'Deploy site'"
    echo ""
    echo "🎉 ¡Tu app estará disponible en Netlify!"
    echo ""
    echo "📱 Características PWA:"
    echo "  • Instalable desde navegador"
    echo "  • Funciona offline"
    echo "  • Geolocalización automática"
    echo "  • 25 spots de Madrid"
    echo "  • Diseño iOS con glassmorphism"
else
    echo "❌ Error al subir a GitHub"
    exit 1
fi
