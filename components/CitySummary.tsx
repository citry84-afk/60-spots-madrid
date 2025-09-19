'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, MapPin, Star, Clock, Users, Sparkles, Heart } from 'lucide-react';
import { City } from '@/lib/content';

interface CitySummaryProps {
  city: City;
  isKidsMode: boolean;
  onClose: () => void;
  onStartExploring: () => void;
}

export default function CitySummary({ 
  city, 
  isKidsMode, 
  onClose, 
  onStartExploring 
}: CitySummaryProps) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const getCityEmoji = (cityName: string) => {
    const emojis: { [key: string]: string } = {
      'Madrid': '🏛️',
      'Barcelona': '🏖️',
      'Granada': '🏰',
      'Sevilla': '🌅',
      'Córdoba': '🕌'
    };
    return emojis[cityName] || '🌍';
  };

  const getCitySummary = (cityName: string, isKids: boolean) => {
    const summaries = {
      'Madrid': {
        adult: "Madrid es la capital más alta de Europa (650m). El Palacio Real tiene 3.418 habitaciones pero ningún rey ha dormido nunca allí. La Puerta de Alcalá es más antigua que el Arco del Triunfo de París. El Retiro era cárcel para plebeyos hasta 1868.",
        kids: "¡Madrid está súper arriba en las montañas! El palacio del rey tiene más habitaciones que días del año, ¡pero nunca duerme allí! Hay un oso gigante de piedra que pesa como 4 elefantes. ¡Es la ciudad más alta de Europa!"
      },
      'Barcelona': {
        adult: "Barcelona tiene 9 sitios UNESCO, todos de Gaudí. La Sagrada Familia lleva 142 años construyéndose. Park Güell era un fracaso - solo vendieron 2 de 60 parcelas. Casa Batlló imita un dragón. Casa Milà no tiene ni un ángulo recto.",
        kids: "¡Barcelona es súper mágica! Gaudí hizo casas de cuentos de hadas. Hay una iglesia que lleva 100 años construyéndose. ¡Una casa parece un dragón gigante! Otra no tiene ni una esquina recta."
      },
      'Granada': {
        adult: "Granada fue el último reino musulmán de Europa (781 años). La Alhambra significa 'castillo rojo'. Tiene el sistema de climatización más sofisticado de la Edad Media. Un susurro en el centro se oye en toda la sala.",
        kids: "¡Granada tenía un reino súper especial! La Alhambra parece un castillo de cuento. Está hecha de piedra roja que brilla como el fuego. ¡Tiene agua que corre por todas partes como ríos mágicos!"
      },
      'Sevilla': {
        adult: "Sevilla fue la ciudad más rica de Europa durante 300 años. Todo el oro de América pasaba por aquí. La Catedral es la gótica más grande del mundo. Cristóbal Colón está enterrado aquí... probablemente.",
        kids: "¡Sevilla era la ciudad más rica del mundo! Todo el oro de América venía aquí. Tiene la iglesia más grande de España. ¡Aquí está enterrado el que descubrió América!"
      },
      'Córdoba': {
        adult: "Córdoba fue la ciudad más grande de Europa en el siglo X (500.000 habitantes). Es la única mezquita-catedral del mundo. Tiene 856 columnas recicladas de templos romanos. El mihrab apunta a Damasco, no a La Meca.",
        kids: "¡Córdoba era la ciudad más grande y lista de Europa! Es súper especial porque es mezquita e iglesia a la vez. ¡Tiene más de 800 columnas súper bonitas de colores diferentes!"
      }
    };
    
    return summaries[cityName as keyof typeof summaries]?.[isKids ? 'kids' : 'adult'] || 'Resumen no disponible';
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
        className="w-full bg-white rounded-t-3xl shadow-ios-xl max-h-[90vh] overflow-hidden relative"
      >
        {/* Header con gradiente */}
        <div className="h-48 bg-gradient-to-br from-ios-blue to-purple-500 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Botón cerrar */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-6 right-6 glass rounded-full p-3 touch-target"
          >
            <X className="w-5 h-5 text-white" />
          </motion.button>

          {/* Like button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="absolute top-6 left-6 glass rounded-full p-3 touch-target"
          >
            <motion.div
              animate={liked ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart className={`w-5 h-5 ${liked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
            </motion.div>
          </motion.button>

          {/* Título de ciudad */}
          <div className="absolute bottom-6 left-6 right-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-4xl">{getCityEmoji(city.name)}</span>
                <h2 className="text-3xl font-black text-white">
                  {city.name}
                </h2>
              </div>
              <div className="flex items-center space-x-6 text-white/90">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">España</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">{city.pois.length} lugares</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">4.9</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {/* Botón de vídeo de ciudad */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center space-x-2 touch-target shadow-ios"
          >
            <Play className="w-5 h-5" />
            <span>Ver resumen de {city.name} (60s)</span>
          </motion.button>

          {/* Resumen escrito */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-5 h-5 text-ios-blue" />
              <h3 className="font-bold text-gray-900 text-lg">
                {isKidsMode ? 'Para Niños' : 'Para Adultos'}
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              {getCitySummary(city.name, isKidsMode)}
            </p>
          </motion.div>

          {/* Botón empezar explorar */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStartExploring}
            className="w-full btn-primary py-4 px-6 rounded-2xl font-bold flex items-center justify-center space-x-2 touch-target"
          >
            <MapPin className="w-5 h-5" />
            <span>Empezar a explorar {city.name}</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
