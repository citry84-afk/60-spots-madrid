'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown, Globe, Sparkles, Star, X } from 'lucide-react';
import { City } from '@/lib/content';

interface CitySelectorProps {
  cities: City[];
  selectedCity: City | null;
  onCitySelect: (city: City) => void;
  onUseLocation: () => void;
  isDetectingLocation: boolean;
}

export default function CitySelector({ 
  cities, 
  selectedCity, 
  onCitySelect, 
  onUseLocation, 
  isDetectingLocation 
}: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Hacer scroll hacia arriba cuando se abre la lista y bloquear scroll del body
  useEffect(() => {
    if (isOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Bloquear scroll del body
      document.body.style.overflow = 'hidden';
    } else {
      // Restaurar scroll del body
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup al desmontar
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getCityEmoji = (cityName: string) => {
    const emojis: { [key: string]: string } = {
      'Madrid': '🏛️',
      'Barcelona': '🏖️',
      'Granada': '🏰',
      'Sevilla': '🌅',
      'Córdoba': '🕌'
    };
    return emojis[cityName] || '🌍';
  };

  const getCityGradient = (index: number) => {
    const gradients = [
      'bg-gradient-to-br from-blue-400 to-purple-500',
      'bg-gradient-to-br from-pink-400 to-red-500',
      'bg-gradient-to-br from-green-400 to-blue-500',
      'bg-gradient-to-br from-yellow-400 to-orange-500',
      'bg-gradient-to-br from-purple-400 to-pink-500'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="w-full">
      {/* Botón principal */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full glass rounded-2xl p-4 flex items-center space-x-4 touch-target text-left hover:shadow-ios-lg transition-all duration-300 group"
      >
        <motion.div
          animate={{ 
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.1 : 1
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-ios relative overflow-hidden"
        >
          <Globe className="w-6 h-6 text-white" />
        </motion.div>
        
        <div className="text-left flex-1">
          <p className="text-sm text-ios-gray font-medium">
            {isDetectingLocation ? 'Detectando ubicación...' : 'Selecciona una ciudad'}
          </p>
          <p className="font-bold text-gray-900 text-lg">
            {selectedCity ? (
              <span className="flex items-center space-x-2">
                <span>{getCityEmoji(selectedCity.name)}</span>
                <span>{selectedCity.name}</span>
              </span>
            ) : (
              'Elige tu destino'
            )}
          </p>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative z-10"
        >
          <ChevronDown className="w-6 h-6 text-ios-gray" />
        </motion.div>
      </motion.button>

      {/* Botón de usar ubicación */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onUseLocation}
        disabled={isDetectingLocation}
        className="w-full mt-3 glass rounded-2xl p-4 flex items-center space-x-4 touch-target text-left hover:shadow-ios-lg transition-all duration-300 group disabled:opacity-50"
      >
        <motion.div
          animate={isDetectingLocation ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 1, repeat: isDetectingLocation ? Infinity : 0 }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-ios relative overflow-hidden"
        >
          <MapPin className="w-6 h-6 text-white" />
        </motion.div>
        
        <div className="text-left flex-1">
          <p className="text-sm text-ios-gray font-medium">
            {isDetectingLocation ? 'Detectando...' : 'Usar mi ubicación'}
          </p>
          <p className="font-bold text-gray-900 text-lg">
            {isDetectingLocation ? 'Buscando...' : 'Encuentra la más cercana'}
          </p>
        </div>
      </motion.button>

      {/* Lista de ciudades que aparece desde arriba de la pantalla */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed top-0 left-0 right-0 z-[70] bg-white shadow-2xl max-h-screen overflow-y-auto"
            >
            {/* Header */}
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-ios-blue" />
                  <h3 className="font-bold text-gray-900">Ciudades disponibles</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Cities List */}
            <div className="p-4">
              {cities.map((city, index) => (
                <motion.button
                  key={city.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ 
                    backgroundColor: 'rgba(0, 122, 255, 0.1)',
                    scale: 1.02,
                    x: 5
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onCitySelect(city);
                    setIsOpen(false);
                  }}
                  className="w-full p-4 flex items-center space-x-4 touch-target text-left hover:bg-ios-blue/10 transition-all duration-300 group rounded-2xl mb-2"
                >
                  {/* City Avatar */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-ios relative overflow-hidden"
                  >
                    <img
                      src={city.imageUrl}
                      alt={city.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute bottom-1 right-1 text-lg relative z-10">
                      {getCityEmoji(city.name)}
                    </span>
                  </motion.div>

                  {/* City Info */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-bold text-gray-900 text-lg">{city.name}</h4>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <p className="text-sm text-ios-gray mb-2">
                      {city.pois?.length || 0} lugares increíbles
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-ios-gray">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>4.9</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-ios-blue" />
                        <span>España</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-ios-gray group-hover:text-ios-blue transition-colors"
                  >
                    <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
                  </motion.div>
                </motion.button>
              ))}
            </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}