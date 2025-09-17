'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LocationDetector from '@/components/LocationDetector';
import MapView from '@/components/MapView';
import SpotList from '@/components/SpotList';
import VideoPlayer from '@/components/VideoPlayer';
import ModeToggle from '@/components/ModeToggle';
import CitySelector from '@/components/CitySelector';
import POIDetail from '@/components/POIDetail';
import RoutePlanner from '@/components/RoutePlanner';
import { loadContentManifest, getNearbyPOIs, calculateOptimalRoute, City, POI } from '@/lib/content';

export default function Home() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [nearbyPOIs, setNearbyPOIs] = useState<POI[]>([]);
  const [isKidsMode, setIsKidsMode] = useState(false);
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRoutePlanner, setShowRoutePlanner] = useState(false);

  // Cargar manifest de contenidos al inicio
  useEffect(() => {
    const loadContent = async () => {
      try {
        const manifest = await loadContentManifest();
        setCities(manifest.cities);
        setIsLoading(false);
      } catch (error) {
        setError('Error al cargar contenidos');
        setIsLoading(false);
      }
    };
    loadContent();
  }, []);

  const handleLocationFound = (lat: number, lng: number) => {
    setUserLocation([lat, lng]);
    setIsDetectingLocation(false);
    
    // Buscar ciudad más cercana
    let closestCity = cities[0];
    let minDistance = Infinity;
    
    cities.forEach(city => {
      const distance = Math.sqrt(
        Math.pow(city.center.lat - lat, 2) + Math.pow(city.center.lng - lng, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestCity = city;
      }
    });
    
    if (closestCity) {
      setSelectedCity(closestCity);
      const pois = getNearbyPOIs(lat, lng, closestCity, 10000);
      setNearbyPOIs(pois);
    }
  };

  const handleLocationError = (errorMessage: string) => {
    setError(errorMessage);
    setIsDetectingLocation(false);
  };

  const handleUseLocation = () => {
    setIsDetectingLocation(true);
    // El LocationDetector se encargará de llamar handleLocationFound
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    if (userLocation) {
      const pois = getNearbyPOIs(userLocation[0], userLocation[1], city, 10000);
      setNearbyPOIs(pois);
    } else {
      setNearbyPOIs(city.pois);
    }
  };

  const handlePOISelect = (poi: POI) => {
    setSelectedPOI(poi);
  };

  const handleClosePOI = () => {
    setSelectedPOI(null);
  };

  const handleNavigate = () => {
    // Implementar navegación (abrir Maps/Google Maps)
    if (selectedPOI) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedPOI.coordinates.lat},${selectedPOI.coordinates.lng}`;
      window.open(url, '_blank');
    }
  };

  const handleVideoPlay = (isKids: boolean) => {
    if (selectedPOI) {
      const videoUrl = isKids ? selectedPOI.videoUrlKids : selectedPOI.videoUrlAdult;
      if (videoUrl) {
        // Implementar reproductor de vídeo
        console.log('Playing video:', videoUrl);
      }
    }
  };

  const handleStartRoute = (route: POI[]) => {
    setShowRoutePlanner(false);
    // Implementar navegación por ruta
    console.log('Starting route:', route);
  };

  if (isLoading) {
    return <LocationDetector onLocationFound={handleLocationFound} onLocationError={handleLocationError} />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-ios-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-8 max-w-sm w-full text-center shadow-ios"
        >
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Ups, algo salió mal
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
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ios-background">
      {/* Selector de ciudad */}
      <div className="p-6">
        <CitySelector
          cities={cities}
          selectedCity={selectedCity}
          onCitySelect={handleCitySelect}
          onUseLocation={handleUseLocation}
          isDetectingLocation={isDetectingLocation}
        />
      </div>

      {/* Mapa principal */}
      <div className="h-96 relative mx-6 rounded-3xl overflow-hidden shadow-ios-lg">
        {userLocation && selectedCity && (
          <MapView
            spots={nearbyPOIs}
            userLocation={userLocation}
            onSpotSelect={handlePOISelect}
          />
        )}
      </div>

      {/* Toggle de modo */}
      <div className="absolute top-6 right-6 z-30">
        <ModeToggle
          isKidsMode={isKidsMode}
          onToggle={() => setIsKidsMode(!isKidsMode)}
        />
      </div>

      {/* Indicador de ubicación */}
      {userLocation && (
        <div className="absolute top-6 left-6 z-30">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-2xl px-4 py-2 shadow-ios"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-900">
                Ubicación detectada
              </span>
            </div>
          </motion.div>
        </div>
      )}

      {/* Lista de POIs o Route Planner */}
      {nearbyPOIs.length > 0 && (
        <div className="p-6">
          {showRoutePlanner ? (
            <RoutePlanner
              pois={nearbyPOIs}
              userLocation={userLocation!}
              onStartRoute={handleStartRoute}
              onPOISelect={handlePOISelect}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">
                  Lugares cerca de ti
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowRoutePlanner(true)}
                  className="glass rounded-full p-3 touch-target"
                >
                  <span className="text-ios-blue font-semibold text-sm">
                    Planificar
                  </span>
                </motion.button>
              </div>
              
              <div className="space-y-2">
                {nearbyPOIs.slice(0, 5).map((poi, index) => (
                  <motion.div
                    key={poi.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePOISelect(poi)}
                    className="glass rounded-2xl p-4 cursor-pointer touch-target"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden">
                        <img
                          src={poi.imageUrl}
                          alt={poi.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-gray-900 truncate">
                          {poi.name}
                        </h5>
                        <p className="text-sm text-ios-gray">
                          {poi.category}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-ios-gray">
                            {poi.distance ? `${Math.round(poi.distance)}m` : 'Cerca'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* POI Detail Modal */}
      <AnimatePresence>
        {selectedPOI && (
          <POIDetail
            poi={selectedPOI}
            isKidsMode={isKidsMode}
            onClose={handleClosePOI}
            onNavigate={handleNavigate}
            onVideoPlay={handleVideoPlay}
          />
        )}
      </AnimatePresence>

      {/* PWA Install Prompt */}
      <div className="fixed bottom-6 left-6 right-6 z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="glass rounded-2xl p-4 shadow-ios"
        >
          <div className="flex items-center space-x-3">
            <div className="text-2xl">📱</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">
                Instala 60secondstrip
              </h3>
              <p className="text-xs text-ios-gray">
                Acceso rápido desde tu pantalla de inicio
              </p>
            </div>
            <button className="text-ios-blue font-medium text-sm">
              Instalar
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}