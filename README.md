# 60secondstrip

Una app PWA de viajes, global, con filosofía Apple: simplicidad visual, zero cognitive load, tap y ya está.

## 🎯 Características

- **Visual-first**: Cards enormes con imágenes impactantes
- **Zero learning curve**: Intuitivo como iOS
- **60 segundos**: Videos cortos y curiosos sobre lugares
- **Modo Adultos/Niños**: Contenido adaptado
- **PWA completa**: Funciona offline, instalable
- **Geolocalización**: Detecta ubicación automáticamente en cualquier ciudad

## 🚀 Tecnologías

- **Next.js 14** con App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilos
- **Framer Motion** para animaciones
- **Leaflet** para mapas
- **PWA** con Service Worker

## 📱 Flujo de Usuario

1. **Abrir app** → Detección automática de ubicación
2. **Ver mapa** → Spots cercanos con marcadores
3. **Swipe cards** → Navegación visual
4. **Tap card** → Video 60 segundos inicia inmediatamente
5. **Swipe left/right** → Siguiente spot
6. **Swipe up** → Volver a spots

## 🎨 Diseño iOS

- **Glassmorphism**: Efectos de cristal y blur
- **Sombras suaves**: Shadow-ios personalizadas
- **Animaciones fluidas**: 0.3s cubic-bezier
- **Touch targets**: Mínimo 44px
- **Colores iOS**: Azul #007AFF, grises del sistema

## 🏗️ Instalación

```bash
npm install
npm run dev
```

## 📦 Estructura

```
app/
├── page.tsx          # Página principal
├── layout.tsx        # Layout con PWA
├── globals.css       # Estilos globales
└── manifest.json     # PWA manifest

components/
├── LocationDetector.tsx  # Detección GPS
├── MapView.tsx          # Mapa con Leaflet
├── SpotCard.tsx         # Card visual
├── SpotList.tsx         # Lista swipeable
├── VideoPlayer.tsx      # Reproductor fullscreen
└── ModeToggle.tsx       # Toggle Adultos/Niños

lib/
└── data.ts             # Datos de Madrid + utilidades
```

## 🗺️ Datos de lugares (global)

Cada spot incluye:
- Coordenadas GPS
- Imagen de Unsplash
- Contenido Adultos/Niños
- Curiosidades históricas
- Videos de 60 segundos

## 🎯 Filosofía Apple

- **1 acción por pantalla** máximo
- **Visual hierarchy** clara
- **Gestures naturales** (swipe, tap)
- **Instant feedback** en cada acción
- **Zero learning curve**

## 📱 PWA Features

- **Offline-first**: Cache de spots cercanos
- **Instalable**: Desde navegador
- **Responsive**: Mobile-first
- **Fast**: Carga instantánea
- **Native feel**: Como app nativa

## 🚀 Deploy

```bash
npm run build
npm start
```

Perfecto para Vercel, Netlify o cualquier hosting estático.

---

**Hecho con ❤️ siguiendo los principios de diseño de Apple**
