'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Play, RotateCcw, CheckCircle, Clock, Star, Sparkles, Route, Zap } from 'lucide-react';
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
    await new Promise(resolve => setTimeout(resolve, 1500));
    
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
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 bg-gradient-to-br from-ios-blue to-purple-500 rounded-2xl flex items-center justify-center"
          >
            <Route className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              Planificar recorrido
            </h3>
            <p className="text-white/70 text-sm">
              {pois.length} lugares increíbles
            </p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={calculateRoute}
          disabled={isCalculating || pois.length === 0}
          className="glass rounded-2xl p-4 touch-target disabled:opacity-50"
        >
          <motion.div
            animate={isCalculating ? { rotate: 360 } : {}}
            transition={{ duration: 1, repeat: isCalculating ? Infinity : 0 }}
          >
            <RotateCcw className="w-6 h-6 text-ios-blue" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Ruta óptima */}
      <AnimatePresence>
        {optimalRoute.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="glass-colored rounded-3xl p-6 space-y-4 shadow-ios-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center"
                >
                  <Zap className="w-4 h-4 text-white" />
                </motion.div>
                <h4 className="font-bold text-gray-900 text-xl">
                  Ruta optimizada
                </h4>
              </div>
              <div className="flex items-center space-x-3 text-ios-gray">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    ~{Math.ceil(optimalRoute.length * 2)} min
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {optimalRoute.length} paradas
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {optimalRoute.slice(0, 5).map((poi, index) => (
                <motion.div
                  key={poi.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-ios-blue/5 transition-all duration-300 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 bg-gradient-to-br from-ios-blue to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-ios"
                  >
                    {index + 1}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate group-hover:text-ios-blue transition-colors">
                      {poi.name}
                    </p>
                    <p className="text-sm text-ios-gray">
                      {poi.distance ? formatDistance(poi.distance) : 'Cerca'}
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </motion.div>
                </motion.div>
              ))}
              
              {optimalRoute.length > 5 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center py-2"
                >
                  <p className="text-sm text-ios-gray font-medium">
                    +{optimalRoute.length - 5} lugares más
                  </p>
                </motion.div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={startRoute}
              className="w-full btn-primary py-4 px-6 rounded-2xl font-bold flex items-center justify-center space-x-2 touch-target"
            >
              <Play className="w-5 h-5" />
              <span>Empezar recorrido</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista de POIs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-white" />
          <h4 className="font-bold text-white text-xl">
            Todos los lugares
          </h4>
        </div>
        
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {pois.map((poi, index) => (
            <motion.div
              key={poi.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onPOISelect(poi)}
              className="glass card-hover rounded-3xl p-4 cursor-pointer touch-target relative overflow-hidden group"
            >
              {/* Shine effect */}
              <div className="shine absolute inset-0" />
              
              <div className="flex items-center space-x-4 relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl overflow-hidden shadow-ios"
                >
                  <img
                    src={poi.imageUrl}
                    alt={poi.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-gray-900 text-lg truncate group-hover:text-ios-blue transition-colors">
                    {poi.name}
                  </h5>
                  <p className="text-ios-gray text-sm mb-2">
                    {poi.category}
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-ios-blue" />
                      <span className="text-xs text-ios-gray">
                        {poi.distance ? formatDistance(poi.distance) : 'Cerca'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-ios-gray">4.8</span>
                    </div>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="w-10 h-10 bg-ios-blue/20 rounded-2xl flex items-center justify-center group-hover:bg-ios-blue/30 transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-ios-blue" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}