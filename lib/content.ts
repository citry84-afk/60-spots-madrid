export interface POI {
  id: string;
  name: string;
  category: string;
  coordinates: { lat: number; lng: number };
  imageUrl: string;
  videoUrlAdult: string;
  videoUrlKids: string;
  summaryAdult?: string;
  summaryKids?: string;
  curiosityFacts?: string[];
}

export interface City {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  pois: POI[];
}

export interface ContentManifest {
  version: string;
  cities: City[];
}

// Función para cargar el manifest de contenidos
export async function loadContentManifest(): Promise<ContentManifest> {
  try {
    const response = await fetch('/content/manifest.json');
    if (!response.ok) throw new Error('Failed to load content manifest');
    return await response.json();
  } catch (error) {
    console.error('Error loading content manifest:', error);
    // Fallback a datos básicos
    return {
      version: "1.0",
      cities: []
    };
  }
}

// Función para calcular distancia entre dos puntos
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c * 1000; // Distancia en metros
}

// Función para obtener POIs cercanos ordenados por distancia
export function getNearbyPOIs(
  userLat: number,
  userLng: number,
  city: City,
  maxDistance: number = 5000
): POI[] {
  return city.pois
    .map(poi => ({
      ...poi,
      distance: calculateDistance(userLat, userLng, poi.coordinates.lat, poi.coordinates.lng)
    }))
    .filter(poi => poi.distance! <= maxDistance)
    .sort((a, b) => a.distance! - b.distance!);
}

// Heurística 2-opt para calcular ruta eficiente
export function calculateOptimalRoute(
  userLat: number,
  userLng: number,
  pois: POI[]
): POI[] {
  if (pois.length <= 1) return pois;
  
  // Calcular matriz de distancias
  const distances: number[][] = [];
  const points = [{ lat: userLat, lng: userLng }, ...pois.map(p => p.coordinates)];
  
  for (let i = 0; i < points.length; i++) {
    distances[i] = [];
    for (let j = 0; j < points.length; j++) {
      distances[i][j] = calculateDistance(
        points[i].lat, points[i].lng,
        points[j].lat, points[j].lng
      );
    }
  }
  
  // Inicializar con ruta greedy
  let route = [0]; // Empezar desde el usuario
  let unvisited = Array.from({ length: pois.length }, (_, i) => i + 1);
  
  while (unvisited.length > 0) {
    const last = route[route.length - 1];
    const nearest = unvisited.reduce((min, idx) => 
      distances[last][idx] < distances[last][min] ? idx : min
    );
    route.push(nearest);
    unvisited = unvisited.filter(idx => idx !== nearest);
  }
  
  // Aplicar 2-opt para mejorar la ruta
  let improved = true;
  while (improved) {
    improved = false;
    for (let i = 1; i < route.length - 1; i++) {
      for (let j = i + 1; j < route.length; j++) {
        const currentCost = 
          distances[route[i-1]][route[i]] + 
          distances[route[j]][route[j+1] || 0];
        const newCost = 
          distances[route[i-1]][route[j]] + 
          distances[route[i]][route[j+1] || 0];
        
        if (newCost < currentCost) {
          // Invertir el segmento
          const segment = route.slice(i, j + 1).reverse();
          route.splice(i, j - i + 1, ...segment);
          improved = true;
        }
      }
    }
  }
  
  // Convertir índices de vuelta a POIs (excluyendo el punto de inicio)
  return route.slice(1).map(idx => pois[idx - 1]);
}
