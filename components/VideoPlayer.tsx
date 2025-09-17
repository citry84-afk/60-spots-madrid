'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Spot } from '@/lib/data';

interface VideoPlayerProps {
  spot: Spot;
  isKidsMode: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function VideoPlayer({ 
  spot, 
  isKidsMode, 
  onClose, 
  onNext, 
  onPrevious 
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60);
  const [showControls, setShowControls] = useState(true);
  const [showLikeBurst, setShowLikeBurst] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  const content = isKidsMode ? spot.kidsContent : spot.adultContent;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      // Auto-advance to next spot after video ends
      setTimeout(onNext, 1000);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onNext]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(console.error);
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
  }, [isMuted]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  const handleDoubleTap = () => {
    setShowLikeBurst(true);
    setTimeout(() => setShowLikeBurst(false), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      {/* Video */}
      <div className="relative w-full h-full" onDoubleClick={handleDoubleTap}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={content.videoUrl}
          autoPlay
          loop={false}
          playsInline
        />
        
        {/* Overlay de información */}
        <div className="absolute top-0 left-0 right-0 p-6">
          <div className="flex justify-between items-start">
            <div className="glass rounded-2xl p-4 max-w-sm">
              <h2 className="text-xl font-bold text-white mb-1">
                {spot.name}
              </h2>
              <p className="text-white/80 text-sm">
                {isKidsMode ? 'Modo Niños' : 'Modo Adultos'}
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="glass rounded-full p-3 touch-target"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Controles */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-0 left-0 right-0 p-6"
            >
              {/* Barra de progreso */}
              <div className="mb-6">
                <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="flex justify-between text-white/80 text-sm mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controles de reproducción */}
              <div className="flex items-center justify-center space-x-6">
                <button
                  onClick={onPrevious}
                  className="glass rounded-full p-4 touch-target"
                >
                  <RotateCcw className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="glass rounded-full p-6 touch-target"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="glass rounded-full p-4 touch-target"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6 text-white" />
                  ) : (
                    <Volume2 className="w-6 h-6 text-white" />
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gestos de navegación */}
        <div className="absolute inset-0 flex">
          <div 
            className="flex-1" 
            onTouchEnd={(e) => {
              const touch = e.changedTouches[0];
              const startX = touch.clientX;
              if (startX < window.innerWidth / 2) {
                onPrevious();
              }
            }}
          />
          <div 
            className="flex-1"
            onTouchEnd={(e) => {
              const touch = e.changedTouches[0];
              const startX = touch.clientX;
              if (startX > window.innerWidth / 2) {
                onNext();
              }
            }}
          />
        </div>

        {/* Like burst */}
        <AnimatePresence>
          {showLikeBurst && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="text-6xl select-none">💙</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
