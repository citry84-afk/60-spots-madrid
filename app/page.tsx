'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LocationDetector from '@/components/LocationDetector';
import MapView from '@/components/MapView';
import SpotList from '@/components/SpotList';
import VideoPlayer from '@/components/VideoPlayer';
import ModeToggle from '@/components/ModeToggle';
import { Spot, getNearbySpots } from '@/lib/data';

export default function Home() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [spots, setSpots] = useState<Spot[]>([]);
  const [isKidsMode, setIsKidsMode] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLocationFound = (lat: number, lng: number) => {
    setUserLocation([lat, lng]);
    const nearbySpots = getNearbySpots(lat, lng, 5000); // 5km radius
    setSpots(nearbySpots);
    setIsLoading(false);

    // Pre-cache media for offline via Service Worker
    const urls: string[] = [];
    nearbySpots.slice(0, 25).forEach((s) => {
      urls.push(s.imageUrl);
      const content = isKidsMode ? s.kidsContent : s.adultContent;
      urls.push(content.videoUrl);
    });
    if (navigator.serviceWorker?.controller && urls.length) {
      navigator.serviceWorker.controller.postMessage({ type: 'CACHE_URLS', urls });
    }
  };

  const handleLocationError = (errorMessage: string) => {
    setError(errorMessage);
    setIsLoading(false);
  };

  const handleSpotSelect = (spot: Spot) => {
    setSelectedSpot(spot);
  };

  const handleCloseVideo = () => {
    setSelectedSpot(null);
  };

  const handleNextSpot = () => {
    if (!selectedSpot) return;
    const currentIndex = spots.findIndex(spot => spot.id === selectedSpot.id);
    const nextIndex = (currentIndex + 1) % spots.length;
    setSelectedSpot(spots[nextIndex]);
  };

  const handlePreviousSpot = () => {
    if (!selectedSpot) return;
    const currentIndex = spots.findIndex(spot => spot.id === selectedSpot.id);
    const prevIndex = currentIndex === 0 ? spots.length - 1 : currentIndex - 1;
    setSelectedSpot(spots[prevIndex]);
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
      {/* Mapa principal */}
      <div className="h-screen relative">
        {userLocation && (
          <MapView
            spots={spots}
            userLocation={userLocation}
            onSpotSelect={handleSpotSelect}
          />
        )}

        {/* Toggle de modo */}
        <div className="absolute top-6 right-6 z-30">
          <ModeToggle
            isKidsMode={isKidsMode}
            onToggle={() => setIsKidsMode(!isKidsMode)}
          />
        </div>

        {/* Indicador de ubicación */}
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
      </div>

      {/* Lista de spots */}
      {spots.length > 0 && (
        <SpotList
          spots={spots}
          isKidsMode={isKidsMode}
          onSpotSelect={handleSpotSelect}
        />
      )}

      {/* Video Player */}
      <AnimatePresence>
        {selectedSpot && (
          <VideoPlayer
            spot={selectedSpot}
            isKidsMode={isKidsMode}
            onClose={handleCloseVideo}
            onNext={handleNextSpot}
            onPrevious={handlePreviousSpot}
          />
        )}
      </AnimatePresence>

      {/* PWA Install Prompt */}
      <div className="fixed bottom-24 left-6 right-6 z-20">
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
                Instala 60 Spots
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
