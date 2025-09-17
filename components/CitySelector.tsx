'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown, Globe } from 'lucide-react';
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

  return (
    <div className="relative">
      {/* Selector principal */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full glass rounded-2xl p-4 flex items-center justify-between touch-target shadow-ios"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-ios-blue/20 rounded-full flex items-center justify-center">
            <Globe className="w-5 h-5 text-ios-blue" />
          </div>
          <div className="text-left">
            <p className="text-sm text-ios-gray">Selecciona una ciudad</p>
            <p className="font-semibold text-gray-900">
              {selectedCity ? selectedCity.name : 'Elige tu destino'}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-ios-gray" />
        </motion.div>
      </motion.button>

      {/* Lista de ciudades */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl shadow-ios-lg z-50 overflow-hidden"
          >
            {cities.map((city, index) => (
              <motion.button
                key={city.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ backgroundColor: 'rgba(0, 122, 255, 0.1)' }}
                onClick={() => {
                  onCitySelect(city);
                  setIsOpen(false);
                }}
                className="w-full p-4 flex items-center space-x-3 touch-target text-left hover:bg-ios-blue/10 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-ios-blue to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {city.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{city.name}</p>
                  <p className="text-sm text-ios-gray">
                    {city.pois.length} lugares para descubrir
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón usar ubicación */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onUseLocation}
        disabled={isDetectingLocation}
        className="w-full mt-3 glass rounded-2xl p-4 flex items-center justify-center space-x-3 touch-target shadow-ios disabled:opacity-50"
      >
        <motion.div
          animate={isDetectingLocation ? { rotate: 360 } : {}}
          transition={{ duration: 2, repeat: isDetectingLocation ? Infinity : 0 }}
        >
          <MapPin className="w-5 h-5 text-ios-blue" />
        </motion.div>
        <span className="font-semibold text-gray-900">
          {isDetectingLocation ? 'Detectando ubicación...' : 'Usar mi ubicación'}
        </span>
      </motion.button>
    </div>
  );
}
