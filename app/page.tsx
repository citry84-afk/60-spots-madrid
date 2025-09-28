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
import CitySummary from '@/components/CitySummary';
import Footer from '@/components/Footer';
import { loadContentManifest, getNearbyPOIs, calculateOptimalRoute, City, POI } from '@/lib/content';
import { MapPin, Play, Star, Heart, Share2, Download, Sparkles, Compass, Globe, ChevronDown, Clock } from 'lucide-react';

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
  const [showHero, setShowHero] = useState(true);
  const [showInstallBanner, setShowInstallBanner] = useState(true);
  const [showCitySummary, setShowCitySummary] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [currentVideoTitle, setCurrentVideoTitle] = useState('');

  // Cargar manifest de contenidos al inicio
  useEffect(() => {
    // One-time SW cache clear to avoid stale ads/image requests after deployment
    try {
      const flagKey = 'cacheClearedV1';
      if (typeof window !== 'undefined' && !localStorage.getItem(flagKey)) {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.ready
            .then((reg) => reg.active?.postMessage({ type: 'NUKE_CACHES' }))
            .catch(() => {});
        }
        localStorage.setItem(flagKey, '1');
      }
    } catch {}

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
    setShowHero(false);
    setShowInstallBanner(false);
    
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
    setShowHero(false);
    setShowInstallBanner(false);
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setShowHero(false);
    setShowInstallBanner(false);
    setShowCitySummary(true);
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
    if (selectedPOI) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedPOI.coordinates.lat},${selectedPOI.coordinates.lng}`;
      window.open(url, '_blank');
    }
  };

  const handleVideoPlay = (isKids: boolean) => {
    if (selectedPOI) {
      const videoUrl = isKids ? selectedPOI.videoUrlKids : selectedPOI.videoUrlAdult;
      if (videoUrl) {
        console.log('Intentando reproducir vídeo:', videoUrl);
        setCurrentVideoUrl(videoUrl);
        setCurrentVideoTitle(`${selectedPOI.name} - ${isKids ? 'Niños' : 'Adultos'}`);
        setShowVideoPlayer(true);
      }
    }
  };

  const handleStartRoute = (route: POI[]) => {
    setShowRoutePlanner(false);
    console.log('Starting route:', route);
  };

  const handleCloseCitySummary = () => {
    setShowCitySummary(false);
  };

  const handleStartExploring = () => {
    setShowCitySummary(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-aurora flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-6"
          >
            <Compass className="w-full h-full text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">60secondstrip</h2>
          <motion.p 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/80"
          >
            Cargando aventuras...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-aurora flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-8 max-w-sm w-full text-center shadow-ios-xl"
        >
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            😔
          </motion.div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Ups, algo salió mal
          </h2>
          <p className="text-ios-gray mb-6">
            {error}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="btn-primary w-full"
          >
            Intentar de nuevo
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-aurora">
      {/* Hero Section */}
      <AnimatePresence>
        {showHero && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center min-h-screen p-6 relative"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0]
                }}
                transition={{ 
                  duration: 25, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"
              />
            </div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center z-10"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="text-8xl mb-6"
              >
                🌍
              </motion.div>
              
              <h1 className="text-5xl font-black text-white mb-4 gradient-text">
                60secondstrip
              </h1>
              
              <p className="text-xl text-white/90 mb-8 max-w-md mx-auto leading-relaxed">
                Descubre el mundo en 60 segundos. 
                <br />
                <span className="font-semibold">Aventuras instantáneas</span> que te harán viajar sin moverte.
              </p>

              {/* City Selector */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-md mx-auto mb-4"
              >
                <CitySelector
                  cities={cities}
                  selectedCity={selectedCity}
                  onCitySelect={handleCitySelect}
                  onUseLocation={handleUseLocation}
                  isDetectingLocation={isDetectingLocation}
                />
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-3 max-w-sm mx-auto mb-6"
              >
                {[
                  { icon: <Play className="w-6 h-6 text-ios-blue" />, text: "Videos 60s" },
                  { icon: <MapPin className="w-6 h-6 text-green-500" />, text: "GPS" },
                  { icon: <Heart className="w-6 h-6 text-pink-500" />, text: "Offline" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="glass rounded-2xl p-4 text-center"
                  >
                    <div className="mb-2 flex justify-center">
                      {feature.icon}
                    </div>
                    <p className="text-gray-900 text-sm font-semibold">
                      {feature.text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


      {/* Main App Content */}
      <AnimatePresence>
        {!showHero && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pb-8"
          >
                        {/* Header */}
                        <div className="p-6">
                          
                          <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-between mb-6"
                          >
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                  >
                    <Globe className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {selectedCity?.name || 'Explorar'}
                    </h2>
                    <p className="text-white/70 text-sm">
                      {nearbyPOIs.length} lugares cerca
                    </p>
                  </div>
                </div>
                
                <ModeToggle
                  isKidsMode={isKidsMode}
                  onToggle={() => setIsKidsMode(!isKidsMode)}
                />
              </motion.div>

              {/* City Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <CitySelector
                  cities={cities}
                  selectedCity={selectedCity}
                  onCitySelect={handleCitySelect}
                  onUseLocation={handleUseLocation}
                  isDetectingLocation={isDetectingLocation}
                />
              </motion.div>
            </div>

            {/* Map */}
            <div className="px-6 mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="h-80 relative rounded-3xl overflow-hidden shadow-ios-xl"
              >
                {userLocation && selectedCity && (
                  <MapView
                    spots={nearbyPOIs}
                    userLocation={userLocation}
                    onSpotSelect={handlePOISelect}
                  />
                )}
              </motion.div>
            </div>

            {/* Content */}
            <div className="px-6 pb-8">
              {nearbyPOIs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {showRoutePlanner ? (
                    <RoutePlanner
                      pois={nearbyPOIs}
                      userLocation={userLocation!}
                      onStartRoute={handleStartRoute}
                      onPOISelect={handlePOISelect}
                    />
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            Lugares increíbles
                          </h3>
                          <p className="text-white/80 text-sm">
                            Descubre los mejores lugares de {selectedCity?.name}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowRoutePlanner(true)}
                          className="glass rounded-full p-3 touch-target"
                        >
                          <Sparkles className="w-5 h-5 text-white" />
                        </motion.button>
                      </div>

                      {/* Estadísticas de la ciudad */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass rounded-2xl p-4 mb-4"
                      >
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-ios-blue mb-1">
                              {nearbyPOIs.length}
                            </div>
                            <div className="text-xs text-ios-gray">Lugares</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-500 mb-1">
                              60s
                            </div>
                            <div className="text-xs text-ios-gray">Por lugar</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-500 mb-1">
                              4.8
                            </div>
                            <div className="text-xs text-ios-gray">Rating</div>
                          </div>
                        </div>
                      </motion.div>
                      
                                  <div className="space-y-2">
                                    
                                    {nearbyPOIs.slice(0, 5).map((poi, index) => (
                          <motion.div
                            key={poi.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePOISelect(poi)}
                            className="glass card-hover rounded-3xl p-5 cursor-pointer touch-target relative overflow-hidden"
                          >
                            <div className="flex items-center space-x-4">
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="w-20 h-20 rounded-2xl overflow-hidden shadow-ios relative"
                              >
                                <img
                                  src={poi.imageUrl}
                                  alt={poi.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                              </motion.div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-bold text-gray-900 text-lg truncate mb-1">
                                  {poi.name}
                                </h5>
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="bg-gradient-to-r from-ios-blue to-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                    {poi.category}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-4 h-4 text-ios-blue" />
                                    <span className="text-sm text-ios-gray font-medium">
                                      {poi.distance ? `${Math.round(poi.distance)}m` : 'Cerca'}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span className="text-sm text-ios-gray font-medium">4.8</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4 text-green-500" />
                                    <span className="text-sm text-ios-gray font-medium">60s</span>
                                  </div>
                                </div>
                              </div>
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                className="w-12 h-12 bg-gradient-to-r from-ios-blue to-purple-500 rounded-full flex items-center justify-center shadow-ios"
                              >
                                <Play className="w-5 h-5 text-white ml-1" />
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Sección de lugares destacados */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8"
                      >
                        <h4 className="text-xl font-bold text-white mb-4">
                          Más lugares en {selectedCity?.name}
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {nearbyPOIs.slice(5, 9).map((poi, index) => (
                            <motion.div
                              key={poi.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7 + index * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handlePOISelect(poi)}
                              className="glass rounded-2xl p-4 cursor-pointer touch-target relative overflow-hidden"
                            >
                              <div className="aspect-square rounded-xl overflow-hidden mb-3 relative">
                                <img
                                  src={poi.imageUrl}
                                  alt={poi.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-white/90 text-xs px-2 py-1 rounded-full font-medium">
                                    {poi.category}
                                  </span>
                                </div>
                              </div>
                              <h5 className="font-bold text-gray-900 text-sm mb-1 truncate">
                                {poi.name}
                              </h5>
                              <div className="flex items-center space-x-2">
                                <Star className="w-3 h-3 text-yellow-500" />
                                <span className="text-xs text-ios-gray">4.8</span>
                                <Clock className="w-3 h-3 text-green-500 ml-2" />
                                <span className="text-xs text-ios-gray">60s</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* City Summary Modal */}
      <AnimatePresence>
        {showCitySummary && selectedCity && (
          <CitySummary
            city={selectedCity}
            isKidsMode={isKidsMode}
            onClose={handleCloseCitySummary}
            onStartExploring={handleStartExploring}
          />
        )}
      </AnimatePresence>

      {/* POI Detail Modal */}
      <AnimatePresence>
        {selectedPOI && (
          <POIDetail
            poi={selectedPOI}
            isKidsMode={isKidsMode}
            setIsKidsMode={setIsKidsMode}
            onClose={handleClosePOI}
            onNavigate={handleNavigate}
            onVideoPlay={handleVideoPlay}
          />
        )}
      </AnimatePresence>

      {/* Video Player */}
      <AnimatePresence>
        {showVideoPlayer && (
          <VideoPlayer
            videoUrl={currentVideoUrl}
            title={currentVideoTitle}
            onClose={() => setShowVideoPlayer(false)}
          />
        )}
      </AnimatePresence>

      {/* PWA Install Prompt - Solo mostrar en hero y ocultar al interactuar */}
      <AnimatePresence>
        {showInstallBanner && showHero && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 3 }}
            className="fixed bottom-6 left-6 right-6 z-20"
          >
            <div className="glass rounded-3xl p-4 shadow-ios-xl">
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="text-3xl"
                >
                  📱
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">
                    Instala 60secondstrip
                  </h3>
                  <p className="text-ios-gray text-sm">
                    Acceso instantáneo desde tu pantalla de inicio
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowInstallBanner(false);
                    console.log('Instalando PWA...');
                  }}
                  className="btn-primary px-6 py-2 text-sm"
                >
                  Instalar
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}