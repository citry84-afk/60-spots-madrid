'use client';

import { useEffect, useRef } from 'react';
import { Spot } from '@/lib/data';

interface MapViewProps {
  spots: Spot[];
  userLocation: [number, number];
  onSpotSelect: (spot: Spot) => void;
}

export default function MapView({ spots, userLocation, onSpotSelect }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initMap = async () => {
      const L = await import('leaflet');
      
      // Configurar iconos por defecto
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      if (mapRef.current && !mapInstanceRef.current) {
        // Crear mapa
        const map = L.map(mapRef.current, {
          center: userLocation,
          zoom: 15,
          zoomControl: false,
          attributionControl: false,
        });

        // Añadir capa de tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Marcador de usuario
        const userIcon = L.divIcon({
          className: 'user-location-marker',
          html: `
            <div style="
              width: 20px;
              height: 20px;
              background: #007AFF;
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            "></div>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        L.marker(userLocation, { icon: userIcon }).addTo(map);

        // Marcadores de spots
        spots.forEach((spot) => {
          const spotIcon = L.divIcon({
            className: 'spot-marker',
            html: `
              <div style="
                width: 16px;
                height: 16px;
                background: #FF3B30;
                border: 2px solid white;
                border-radius: 50%;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                cursor: pointer;
              "></div>
            `,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          });

          const marker = L.marker([spot.coordinates[0], spot.coordinates[1]], { 
            icon: spotIcon 
          }).addTo(map);

          marker.on('click', () => {
            onSpotSelect(spot);
          });
        });

        mapInstanceRef.current = map;
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [spots, userLocation, onSpotSelect]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-3xl overflow-hidden shadow-ios-lg"
      style={{ minHeight: '300px' }}
    />
  );
}
