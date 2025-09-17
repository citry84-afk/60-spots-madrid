'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Play, User, Baby, Share2, Check, Download } from 'lucide-react';
import { POI } from '@/lib/content';

interface POIDetailProps {
  poi: POI;
  isKidsMode: boolean;
  onClose: () => void;
  onNavigate: () => void;
  onVideoPlay: (isKids: boolean) => void;
}

export default function POIDetail({ 
  poi, 
  isKidsMode, 
  onClose, 
  onNavigate, 
  onVideoPlay 
}: POIDetailProps) {
  const [copied, setCopied] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleShare = async () => {
    const shareUrl = window.location.origin + `/?poi=${poi.id}`;
    const shareData = {
      title: poi.name,
      text: `Descubre ${poi.name} en 60 segundos`,
      url: shareUrl,
    };
    
    if (navigator.share) {
      try { 
        await navigator.share(shareData); 
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {}
    }
  };

  const formatDistance = (distance: number) => {
    if (distance < 1000) {
      return `${Math.round(distance)}m`;
    }
    return `${(distance / 1000).toFixed(1)}km`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="w-full bg-white rounded-t-3xl shadow-ios-lg max-h-[85vh] overflow-hidden"
      >
        {/* Header con imagen */}
        <div className="relative h-64">
          <img
            src={poi.imageUrl}
            alt={poi.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 glass rounded-full p-2 touch-target"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Badge categoría */}
          <div className="absolute top-4 left-4">
            <div className="bg-ios-blue/90 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-xs font-medium text-white">
                {poi.category}
              </span>
            </div>
          </div>

          {/* Título */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-bold text-white mb-1">
              {poi.name}
            </h2>
            <div className="flex items-center space-x-4 text-white/90">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">
                  {poi.distance ? formatDistance(poi.distance) : 'Cerca'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">60 segundos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-4">
          {/* Botones principales */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNavigate}
              className="bg-ios-blue text-white py-3 px-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 touch-target"
            >
              <MapPin className="w-4 h-4" />
              <span>Ir</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowSummary(!showSummary)}
              className="glass py-3 px-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 touch-target"
            >
              <User className="w-4 h-4 text-ios-blue" />
              <span>Info</span>
            </motion.button>
          </div>

          {/* Botones de vídeo */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onVideoPlay(false)}
              disabled={!poi.videoUrlAdult}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 touch-target disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4" />
              <span>Video Adultos</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onVideoPlay(true)}
              disabled={!poi.videoUrlKids}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 touch-target disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Baby className="w-4 h-4" />
              <span>Video Niños</span>
            </motion.button>
          </div>

          {/* Resumen expandible */}
          <AnimatePresence>
            {showSummary && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="glass rounded-2xl p-4"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {isKidsMode ? 'Para Niños' : 'Para Adultos'}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {isKidsMode ? poi.summaryKids : poi.summaryAdult || 'Resumen no disponible'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botones secundarios */}
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShare}
              className="flex-1 glass py-3 px-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 touch-target"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4 text-ios-blue" />}
              <span>{copied ? 'Copiado' : 'Compartir'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 glass py-3 px-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 touch-target"
            >
              <Download className="w-4 h-4 text-ios-blue" />
              <span>Offline</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
