'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Play, User, Baby, Share2, Check, Download, Star, Heart, Sparkles } from 'lucide-react';
import { POI } from '@/lib/content';

interface POIDetailProps {
  poi: POI;
  isKidsMode: boolean;
  setIsKidsMode: (isKids: boolean) => void;
  onClose: () => void;
  onNavigate: () => void;
  onVideoPlay: (isKids: boolean) => void;
}

export default function POIDetail({ 
  poi, 
  isKidsMode, 
  setIsKidsMode,
  onClose, 
  onNavigate, 
  onVideoPlay 
}: POIDetailProps) {
  const [copied, setCopied] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [liked, setLiked] = useState(false);

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

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="w-full bg-white rounded-t-3xl shadow-ios-xl h-[95vh] overflow-y-auto relative"
      >
        {/* Header con imagen */}
        <div className="relative h-80">
          <img
            src={poi.imageUrl}
            alt={poi.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Botón cerrar */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-6 right-6 bg-black/80 backdrop-blur-md rounded-full p-3 touch-target border-2 border-white/30"
          >
            <X className="w-5 h-5 text-white" />
          </motion.button>

          {/* Like button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="absolute top-6 left-6 bg-black/80 backdrop-blur-md rounded-full p-3 touch-target border-2 border-white/30"
          >
            <motion.div
              animate={liked ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart className={`w-5 h-5 ${liked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
            </motion.div>
          </motion.button>

          {/* Badge categoría */}
          <div className="absolute top-6 left-20">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', damping: 15 }}
              className="bg-gradient-to-r from-ios-blue to-purple-500 rounded-full px-4 py-2 shadow-ios"
            >
              <span className="text-xs font-bold text-white flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>{poi.category}</span>
              </span>
            </motion.div>
          </div>

          {/* Título y info */}
          <div className="absolute bottom-6 left-6 right-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-black text-white mb-2">
                {poi.name}
              </h2>
              <div className="flex items-center space-x-6 text-white/90">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {poi.distance ? formatDistance(poi.distance) : 'Cerca'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-medium">60 segundos</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {/* Botones principales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNavigate}
              className="btn-primary py-4 px-6 rounded-2xl font-bold flex items-center justify-center space-x-2 touch-target"
            >
              <MapPin className="w-5 h-5" />
              <span>Ir ahora</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsKidsMode(!isKidsMode)}
              className="bg-gradient-to-r from-ios-blue to-blue-600 text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center space-x-2 touch-target shadow-ios"
            >
              {isKidsMode ? <Baby className="w-5 h-5" /> : <User className="w-5 h-5" />}
              <span>{isKidsMode ? 'Niños' : 'Adultos'}</span>
            </motion.button>
          </motion.div>

          {/* Botones de vídeo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onVideoPlay(false)}
              disabled={!poi.videoUrlAdult}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center space-x-2 touch-target disabled:opacity-50 disabled:cursor-not-allowed shadow-ios"
            >
              <Play className="w-5 h-5" />
              <span>Adultos</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onVideoPlay(true)}
              disabled={!poi.videoUrlKids}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center space-x-2 touch-target disabled:opacity-50 disabled:cursor-not-allowed shadow-ios"
            >
              <Baby className="w-5 h-5" />
              <span>Niños</span>
            </motion.button>
          </motion.div>

          {/* Resumen siempre visible */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-high-contrast rounded-2xl p-5"
          >
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-5 h-5 text-ios-blue" />
              <h3 className="font-bold text-gray-900 text-lg">
                {isKidsMode ? 'Para Niños' : 'Para Adultos'}
              </h3>
            </div>
            
            {/* Imagen del POI */}
            <div className="mb-4">
              <img
                src={poi.imageUrl}
                alt={poi.name}
                className="w-full h-32 object-cover rounded-xl shadow-ios"
              />
            </div>
            
            <p className="text-gray-700 leading-relaxed text-sm">
              {isKidsMode ? poi.summaryKids : poi.summaryAdult || 'Resumen no disponible'}
            </p>
          </motion.div>

          {/* Datos curiosos si existen */}
          {poi.curiosityFacts && poi.curiosityFacts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-high-contrast rounded-2xl p-5"
            >
              <div className="flex items-center space-x-2 mb-3">
                <Star className="w-5 h-5 text-yellow-500" />
                <h3 className="font-bold text-gray-900 text-lg">Datos Curiosos</h3>
              </div>
              <ul className="space-y-2">
                {poi.curiosityFacts.map((fact, index) => (
                  <li key={index} className="text-gray-700 text-sm flex items-start space-x-2">
                    <span className="text-ios-blue font-bold">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Botones secundarios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="btn-glass-high-contrast py-4 px-6 rounded-2xl font-bold flex items-center justify-center space-x-2 touch-target"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Share2 className="w-5 h-5 text-ios-blue" />
              )}
              <span>{copied ? 'Copiado' : 'Compartir'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-glass-high-contrast py-4 px-6 rounded-2xl font-bold flex items-center justify-center space-x-2 touch-target"
            >
              <Download className="w-5 h-5 text-ios-blue" />
              <span>Offline</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}