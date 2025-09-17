'use client';

import { motion } from 'framer-motion';
import { User, Baby, Sparkles } from 'lucide-react';

interface ModeToggleProps {
  isKidsMode: boolean;
  onToggle: () => void;
}

export default function ModeToggle({ isKidsMode, onToggle }: ModeToggleProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className="glass-colored rounded-2xl p-3 touch-target shadow-ios-lg relative overflow-hidden"
    >
      {/* Shine effect */}
      <div className="shine absolute inset-0" />
      
      <div className="flex items-center space-x-2 relative z-10">
        <motion.div
          animate={isKidsMode ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
          className="text-2xl"
        >
          {isKidsMode ? '👶' : '👨‍💼'}
        </motion.div>
        
        <div className="flex items-center space-x-1">
          {isKidsMode ? (
            <Baby className="w-4 h-4 text-pink-500" />
          ) : (
            <User className="w-4 h-4 text-ios-blue" />
          )}
          <span className="text-sm font-bold text-gray-900">
            {isKidsMode ? 'Niños' : 'Adultos'}
          </span>
        </div>
        
        <motion.div
          animate={{ rotate: isKidsMode ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Sparkles className="w-4 h-4 text-ios-blue" />
        </motion.div>
      </div>
    </motion.button>
  );
}