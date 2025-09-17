'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import SpotCard from './SpotCard';
import { Spot } from '@/lib/data';

interface SpotListProps {
  spots: Spot[];
  isKidsMode: boolean;
  onSpotSelect: (spot: Spot) => void;
}

export default function SpotList({ spots, isKidsMode, onSpotSelect }: SpotListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentIndex < spots.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === 'right' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;

    const handleTouchEnd = (ev: TouchEvent) => {
      if (startXRef.current === null || startYRef.current === null) return;
      const endX = ev.changedTouches[0]?.clientX ?? 0;
      const endY = ev.changedTouches[0]?.clientY ?? 0;
      const deltaX = endX - startXRef.current;
      const deltaY = endY - startYRef.current;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) handleSwipe('right');
        else handleSwipe('left');
      }

      startXRef.current = null;
      startYRef.current = null;
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: isExpanded ? 0 : '75%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-ios-lg z-40"
      style={{ height: isExpanded ? '100vh' : '75vh' }}
    >
      {/* Handle para expandir/contraer */}
      <div className="flex justify-center py-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-12 h-1 bg-gray-300 rounded-full touch-target"
        />
      </div>

      {/* Header */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Lugares cerca de ti
            </h2>
            <p className="text-ios-gray">
              {spots.length} lugares encontrados
            </p>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="glass rounded-full p-2 touch-target"
          >
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-ios-gray" />
            ) : (
              <ChevronUp className="w-5 h-5 text-ios-gray" />
            )}
          </button>
        </div>
      </div>

      {/* Lista de spots */}
      <div className="flex-1 overflow-hidden">
        {isExpanded ? (
          // Vista expandida - lista completa
          <div className="h-full overflow-y-auto px-6 space-y-4">
            {spots.map((spot, index) => (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="transform scale-95"
              >
                <SpotCard
                  spot={spot}
                  isKidsMode={isKidsMode}
                  onClick={() => onSpotSelect(spot)}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          // Vista contraída - carrusel horizontal
          <div className="h-full relative">
            <div
              ref={scrollRef}
              className="h-full overflow-x-auto scrollbar-hide"
              onTouchStart={handleTouchStart}
            >
              <div className="flex h-full space-x-4 px-6">
                {spots.slice(0, 3).map((spot, index) => (
                  <motion.div
                    key={spot.id}
                    className="flex-shrink-0 w-80"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SpotCard
                      spot={spot}
                      isKidsMode={isKidsMode}
                      onClick={() => onSpotSelect(spot)}
                      index={index}
                    />
                  </motion.div>
                ))}
                
                {/* Indicador de más spots */}
                {spots.length > 3 && (
                  <div className="flex-shrink-0 w-80 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass rounded-3xl p-8 text-center"
                    >
                      <div className="text-6xl mb-4">✨</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        ¡Más lugares!
                      </h3>
                      <p className="text-ios-gray">
                        Desliza para ver {spots.length - 3} lugares más
                      </p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
