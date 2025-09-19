# 🚀 Deploy en Netlify + GitHub

Guía paso a paso para desplegar 60 Spots Madrid en Netlify con GitHub.

## 📋 Prerrequisitos

- Cuenta de GitHub
- Cuenta de Netlify
- Node.js 18+ instalado
- Git configurado

## 🔧 Configuración Local

### 1. Inicializar Git (si no está hecho)

```bash
# Aceptar licencia de Xcode (solo en macOS)
sudo xcodebuild -license accept

# Inicializar repositorio
git init

# Configurar usuario (reemplaza con tus datos)
git config user.name "Tu Nombre"
git config user.email "tu-email@ejemplo.com"
```

### 2. Crear repositorio en GitHub

1. Ve a [GitHub.com](https://github.com)
2. Click en "New repository"
3. Nombre: `60-spots-madrid`
4. Descripción: `PWA de viajes para descubrir Madrid en 60 segundos`
5. Marcar como **Público**
6. **NO** inicializar con README (ya tenemos uno)
7. Click "Create repository"

### 3. Conectar repositorio local

```bash
# Añadir remote origin (reemplaza con tu usuario)
git remote add origin https://github.com/TU-USUARIO/60-spots-madrid.git

# Añadir todos los archivos
git add .

# Primer commit
git commit -m "🍎 Initial commit: 60 Spots Madrid PWA"

# Subir a GitHub
git push -u origin main
```

## 🌐 Deploy en Netlify

### Opción 1: Deploy Automático (Recomendado)

1. Ve a [Netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Selecciona "GitHub"
4. Autoriza Netlify si es necesario
5. Busca `60-spots-madrid` y selecciónalo
6. Configuración de build:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `18`
7. Click "Deploy site"

### Opción 2: Deploy Manual

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login en Netlify
netlify login

# Deploy
npm run build
netlify deploy --prod
```

## ⚙️ Configuración Adicional

### Variables de Entorno (si las necesitas)

En Netlify Dashboard → Site settings → Environment variables:

```
NODE_VERSION=18
NEXT_PUBLIC_APP_URL=https://tu-sitio.netlify.app
```

### Dominio Personalizado

1. Netlify Dashboard → Domain management
2. Add custom domain
3. Configurar DNS según instrucciones

## 🔄 Deploy Automático

Una vez configurado, cada push a `main` desplegará automáticamente:

```bash
# Hacer cambios
git add .
git commit -m "✨ Nueva funcionalidad"
git push origin main

# Netlify desplegará automáticamente
```

## 📱 PWA en Producción

La app incluye:

- ✅ **Service Worker** para offline
- ✅ **Manifest** para instalación
- ✅ **Iconos** PWA
- ✅ **Meta tags** optimizados
- ✅ **HTTPS** automático en Netlify

## 🎯 URLs Importantes

- **App**: `https://tu-sitio.netlify.app`
- **GitHub**: `https://github.com/TU-USUARIO/60-spots-madrid`
- **Netlify Dashboard**: `https://app.netlify.com`

## 🐛 Troubleshooting

### Error de Build

```bash
# Limpiar cache
rm -rf .next node_modules
npm install
npm run build
```

### Error de Geolocalización

- Verificar que el sitio use HTTPS
- Netlify proporciona HTTPS automático

### Error de PWA

- Verificar manifest.json
- Verificar service worker
- Usar DevTools → Application → Manifest

## 📊 Monitoreo

Netlify proporciona:

- **Analytics** de visitas
- **Performance** metrics
- **Build logs** detallados
- **Deploy previews** para PRs

## 🎉 ¡Listo!

Tu app PWA estará disponible en:

- **Web**: `https://tu-sitio.netlify.app`
- **Móvil**: Instalable desde el navegador
- **Offline**: Funciona sin conexión

¡Disfruta explorando Madrid! 🏛️✨

