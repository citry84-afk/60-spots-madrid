'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Loader2 } from 'lucide-react';

interface LocationDetectorProps {
  onLocationFound: (lat: number, lng: number) => void;
  onLocationError: (error: string) => void;
}

export default function LocationDetector({ onLocationFound, onLocationError }: LocationDetectorProps) {
  const [isDetecting, setIsDetecting] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocalización no soportada');
      onLocationError('Geolocalización no soportada');
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutos
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setIsDetecting(false);
        onLocationFound(latitude, longitude);
      },
      (error) => {
        let errorMessage = 'Error al obtener ubicación';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permiso de ubicación denegado';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Ubicación no disponible';
            break;
          case error.TIMEOUT:
            errorMessage = 'Tiempo de espera agotado';
            break;
        }
        
        setError(errorMessage);
        setIsDetecting(false);
        onLocationError(errorMessage);
      },
      options
    );
  }, [onLocationFound, onLocationError]);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-screen bg-ios-background p-6"
      >
        <div className="glass rounded-3xl p-8 max-w-sm w-full text-center shadow-ios">
          <MapPin className="w-16 h-16 text-ios-gray mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Ubicación requerida
          </h2>
          <p className="text-ios-gray mb-6">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-ios-blue text-white py-3 px-6 rounded-2xl font-medium transition-ios hover:bg-blue-600 touch-target"
          >
            Intentar de nuevo
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-ios-background"
    >
      <div className="glass rounded-3xl p-8 max-w-sm w-full text-center shadow-ios">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto mb-6"
        >
          <Loader2 className="w-16 h-16 text-ios-blue" />
        </motion.div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Detectando ubicación
        </h2>
        <p className="text-ios-gray mb-6">
          Buscando lugares increíbles cerca de ti...
        </p>
        
        <div className="space-y-2">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-ios-blue rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </div>
          <p className="text-sm text-ios-gray">
            Esto solo toma unos segundos
          </p>
        </div>
      </div>
    </motion.div>
  );
}

