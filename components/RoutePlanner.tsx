'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Play, RotateCcw, CheckCircle } from 'lucide-react';
import { POI } from '@/lib/content';

interface RoutePlannerProps {
  pois: POI[];
  userLocation: [number, number];
  onStartRoute: (route: POI[]) => void;
  onPOISelect: (poi: POI) => void;
}

export default function RoutePlanner({ 
  pois, 
  userLocation, 
  onStartRoute, 
  onPOISelect 
}: RoutePlannerProps) {
  const [optimalRoute, setOptimalRoute] = useState<POI[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [routeStarted, setRouteStarted] = useState(false);

  const calculateRoute = async () => {
    setIsCalculating(true);
    
    // Simular cálculo (en realidad usarías la función de lib/content.ts)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Ordenar por distancia como fallback
    const sortedPOIs = [...pois].sort((a, b) => {
      const distA = a.distance || 0;
      const distB = b.distance || 0;
      return distA - distB;
    });
    
    setOptimalRoute(sortedPOIs);
    setIsCalculating(false);
  };

  const startRoute = () => {
    onStartRoute(optimalRoute);
    setRouteStarted(true);
  };

  const formatDistance = (distance: number) => {
    if (distance < 1000) {
      return `${Math.round(distance)}m`;
    }
    return `${(distance / 1000).toFixed(1)}km`;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            Planificar recorrido
          </h3>
          <p className="text-sm text-ios-gray">
            {pois.length} lugares encontrados
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={calculateRoute}
          disabled={isCalculating || pois.length === 0}
          className="glass rounded-full p-3 touch-target disabled:opacity-50"
        >
          <motion.div
            animate={isCalculating ? { rotate: 360 } : {}}
            transition={{ duration: 1, repeat: isCalculating ? Infinity : 0 }}
          >
            <RotateCcw className="w-5 h-5 text-ios-blue" />
          </motion.div>
        </motion.button>
      </div>

      {/* Ruta óptima */}
      <AnimatePresence>
        {optimalRoute.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass rounded-2xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">
                Ruta optimizada
              </h4>
              <div className="flex items-center space-x-2 text-sm text-ios-gray">
                <Clock className="w-4 h-4" />
                <span>~{Math.ceil(optimalRoute.length * 2)} min</span>
              </div>
            </div>

            <div className="space-y-2">
              {optimalRoute.slice(0, 5).map((poi, index) => (
                <motion.div
                  key={poi.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-ios-blue/5 transition-colors"
                >
                  <div className="w-8 h-8 bg-ios-blue rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {poi.name}
                    </p>
                    <p className="text-sm text-ios-gray">
                      {poi.distance ? formatDistance(poi.distance) : 'Cerca'}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {optimalRoute.length > 5 && (
                <p className="text-sm text-ios-gray text-center">
                  +{optimalRoute.length - 5} lugares más
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startRoute}
              className="w-full bg-ios-blue text-white py-3 px-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 touch-target"
            >
              <Play className="w-4 h-4" />
              <span>Empezar recorrido</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista de POIs */}
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-900">
          Todos los lugares
        </h4>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {pois.map((poi, index) => (
            <motion.div
              key={poi.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onPOISelect(poi)}
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
                    <MapPin className="w-3 h-3 text-ios-blue" />
                    <span className="text-xs text-ios-gray">
                      {poi.distance ? formatDistance(poi.distance) : 'Cerca'}
                    </span>
                  </div>
                </div>
                <div className="w-6 h-6 bg-ios-blue/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-ios-blue" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
