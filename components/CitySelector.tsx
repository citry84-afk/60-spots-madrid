'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown, Globe, Sparkles, Star } from 'lucide-react';
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

  // Bloquear scroll del body cuando el selector está abierto
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
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
    <div className="relative">
      {/* Selector principal */}
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full glass-colored rounded-3xl p-5 flex items-center justify-between touch-target shadow-ios-lg relative overflow-hidden"
      >
        {/* Shine effect */}
        <div className="shine absolute inset-0" />
        
        <div className="flex items-center space-x-4 relative z-10">
          <motion.div
            animate={isDetectingLocation ? { rotate: 360 } : {}}
            transition={{ duration: 2, repeat: isDetectingLocation ? Infinity : 0 }}
            className="w-12 h-12 bg-gradient-to-br from-ios-blue to-blue-600 rounded-2xl flex items-center justify-center shadow-ios"
          >
            {isDetectingLocation ? (
              <MapPin className="w-6 h-6 text-white" />
            ) : (
              <Globe className="w-6 h-6 text-white" />
            )}
          </motion.div>
          
          <div className="text-left">
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
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative z-10"
        >
          <ChevronDown className="w-6 h-6 text-ios-gray" />
        </motion.div>
      </motion.button>

      {/* Lista de ciudades */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop para capturar clics y bloquear interacción detrás */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-3 glass-colored rounded-3xl shadow-ios-xl z-50 overflow-hidden"
            >
            {/* Header */}
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-ios-blue" />
                <h3 className="font-bold text-gray-900">Ciudades disponibles</h3>
              </div>
            </div>

            {/* Cities List */}
            <div className="max-h-80 overflow-y-auto overscroll-contain">
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
                  className="w-full p-4 flex items-center space-x-4 touch-target text-left hover:bg-ios-blue/10 transition-all duration-300 group"
                >
                  {/* City Avatar */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-12 h-12 ${getCityGradient(index)} rounded-2xl flex items-center justify-center shadow-ios relative overflow-hidden`}
                  >
                    <span className="text-2xl relative z-10">
                      {getCityEmoji(city.name)}
                    </span>
                    <div className="absolute inset-0 bg-white/20" />
                  </motion.div>
                  
                  {/* City Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-bold text-gray-900 text-lg group-hover:text-ios-blue transition-colors">
                        {city.name}
                      </h4>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-green-500 rounded-full"
                      />
                    </div>
                    <p className="text-ios-gray text-sm">
                      {city.pois.length} lugares increíbles
                    </p>
                    <div className="flex items-center space-x-3 mt-1">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span className="text-xs text-ios-gray">4.9</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-ios-blue" />
                        <span className="text-xs text-ios-gray">España</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronDown className="w-4 h-4 text-ios-blue rotate-[-90deg]" />
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Botón usar ubicación */}
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onUseLocation}
        disabled={isDetectingLocation}
        className="w-full mt-4 glass rounded-3xl p-5 flex items-center justify-center space-x-3 touch-target shadow-ios disabled:opacity-50 relative overflow-hidden"
      >
        {/* Shine effect */}
        <div className="shine absolute inset-0" />
        
        <motion.div
          animate={isDetectingLocation ? { rotate: 360 } : {}}
          transition={{ duration: 2, repeat: isDetectingLocation ? Infinity : 0 }}
          className="relative z-10"
        >
          <MapPin className="w-6 h-6 text-ios-blue" />
        </motion.div>
        
        <span className="font-bold text-gray-900 text-lg relative z-10">
          {isDetectingLocation ? 'Detectando ubicación...' : 'Usar mi ubicación'}
        </span>
        
        {isDetectingLocation && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-2 bg-ios-blue rounded-full relative z-10"
          />
        )}
      </motion.button>
    </div>
  );
}