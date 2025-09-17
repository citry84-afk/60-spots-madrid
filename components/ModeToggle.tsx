'use client';

import { motion } from 'framer-motion';
import { User, Baby } from 'lucide-react';

interface ModeToggleProps {
  isKidsMode: boolean;
  onToggle: () => void;
}

export default function ModeToggle({ isKidsMode, onToggle }: ModeToggleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-full p-1 shadow-ios"
    >
      <div className="flex relative">
        {/* Indicador deslizante */}
        <motion.div
          className="absolute top-0 bottom-0 bg-ios-blue rounded-full"
          initial={false}
          animate={{
            x: isKidsMode ? 40 : 0,
            width: isKidsMode ? 40 : 40,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        />
        
        {/* Botón Adultos */}
        <button
          onClick={() => !isKidsMode && onToggle()}
          className={`relative z-10 flex items-center space-x-2 px-4 py-2 rounded-full transition-colors touch-target ${
            !isKidsMode ? 'text-white' : 'text-ios-gray'
          }`}
        >
          <User className="w-4 h-4" />
          <span className="text-sm font-medium">Adultos</span>
        </button>
        
        {/* Botón Niños */}
        <button
          onClick={() => isKidsMode && onToggle()}
          className={`relative z-10 flex items-center space-x-2 px-4 py-2 rounded-full transition-colors touch-target ${
            isKidsMode ? 'text-white' : 'text-ios-gray'
          }`}
        >
          <Baby className="w-4 h-4" />
          <span className="text-sm font-medium">Niños</span>
        </button>
      </div>
    </motion.div>
  );
}
