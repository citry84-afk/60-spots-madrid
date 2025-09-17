'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Play } from 'lucide-react';
import { Spot } from '@/lib/data';

interface SpotCardProps {
  spot: Spot;
  isKidsMode: boolean;
  onClick: () => void;
  index: number;
}

export default function SpotCard({ spot, isKidsMode, onClick, index }: SpotCardProps) {
  const formatDistance = (distance: number) => {
    if (distance < 1000) {
      return `${Math.round(distance)}m`;
    }
    return `${(distance / 1000).toFixed(1)}km`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full h-96 rounded-3xl overflow-hidden shadow-ios-lg cursor-pointer shine"
      onClick={onClick}
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src={spot.imageUrl}
          alt={spot.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Overlay de contenido */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        {/* Badge de distancia */}
        <div className="absolute top-4 right-4">
          <div className="glass rounded-full px-3 py-1 flex items-center space-x-1">
            <MapPin className="w-3 h-3 text-ios-blue" />
            <span className="text-sm font-medium text-gray-900">
              {formatDistance(spot.distance || 0)}
            </span>
          </div>
        </div>

        {/* Categoría */}
        <div className="absolute top-4 left-4">
          <div className="bg-ios-blue/90 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-xs font-medium text-white">
              {spot.category}
            </span>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-white leading-tight">
            {spot.name}
          </h3>
          
          <div className="flex items-center space-x-2 text-white/90">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">60 segundos</span>
          </div>

          {/* Botón de play */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
          >
            <Play className="w-6 h-6 text-white ml-1" />
          </motion.div>
        </div>
      </div>

      {/* Efecto de brillo al hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
