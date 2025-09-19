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
        adult: "Madrid es la capital más alta de Europa (650 metros sobre el mar), construida donde estaba porque Felipe II quería el centro geográfico exacto de España. El Madrid medieval olía a pescado podrido porque el pescado llegaba desde la costa en carretas y se vendía en la actual Calle Mayor. Datos flipantes: El Palacio Real tiene 3.418 habitaciones (más que Versalles) pero ningún rey ha dormido nunca allí. La Puerta de Alcalá es más antigua que el Arco del Triunfo de París. El oso del madroño pesa 20 toneladas y representa una disputa medieval entre nobles y clérigos sobre quién podía recoger frutos.",
        kids: "¡Madrid es una ciudad súper especial que está en el centro exacto de España, como si fuera el corazón del país! Es la ciudad más alta de Europa - ¡está súper arriba en las montañas! ¡Datos súper locos! El palacio del rey tiene más habitaciones que días tiene el año, ¡pero el rey nunca duerme allí porque prefiere una casa más pequeñita! Hay un oso gigante de piedra que pesa como 4 elefantes juntos y está ahí por una pelea súper antigua sobre quién podía coger frutos de los árboles."
      },
      'Barcelona': {
        adult: "Barcelona es la única ciudad del mundo con 9 sitios Patrimonio de la Humanidad UNESCO, todos obra de un solo arquitecto: Antoni Gaudí. La Sagrada Familia lleva 142 años construyéndose y no se terminará hasta 2026 - será el proyecto arquitectónico más largo de la historia. Genialidades de Gaudí: Park Güell era un fracaso comercial - solo vendieron 2 de 60 parcelas previstas. Casa Batlló imita un dragón y la azotea representa su lomo. Casa Milà (La Pedrera) no tiene un solo ángulo recto en toda su estructura - Gaudí odiaba las líneas rectas porque 'no existen en la naturaleza'.",
        kids: "¡Barcelona es una ciudad súper mágica junto al mar donde un arquitecto loco y genial llamado Gaudí hizo casas que parecen de cuentos de hadas! Hay una iglesia gigante que lleva más de 100 años construyéndose - ¡tus bisabuelos la vieron igual que la ves tú! ¡Casas súper raras! Hay una casa que parece un dragón gigante con escamas de colores en el techo. Otra casa no tiene ni una sola esquina recta porque el arquitecto pensaba que en la naturaleza no hay líneas rectas."
      },
      'Granada': {
        adult: "Granada fue el último reino musulmán de Europa, resistiendo 781 años hasta 1492. La Alhambra es el palacio islámico mejor conservado del mundo y la única 'ciudad palatina' completa que sobrevive. Su nombre significa 'castillo rojo' por el color de sus muros al atardecer. Genialidad islámica: Los Palacios Nazaríes tienen el sistema de climatización más sofisticado de la Edad Media - agua corriente, calefacción por suelo radiante y refrigeración natural. La Sala de los Abencerrajes tiene una acústica perfecta: un susurro en el centro se oye en toda la sala.",
        kids: "¡Granada tenía un reino súper especial que duró casi 800 años! Era como un mundo diferente dentro de España, con reyes que hablaban árabe y construyeron el palacio más bonito del mundo entero. ¡El palacio más mágico! La Alhambra parece un castillo de cuento de hadas pero de verdad. Está hecha de piedra roja que brilla como el fuego cuando se pone el sol. ¡Y por dentro tiene agua que corre por todas partes como ríos pequeñitos que refrescan en verano y calientan en invierno!"
      },
      'Sevilla': {
        adult: "Sevilla fue la ciudad más rica de Europa durante 300 años gracias al monopolio del comercio con América. Todo el oro y la plata del Nuevo Mundo pasaba obligatoriamente por aquí. La Casa de Contratación controlaba el 100% del tráfico comercial atlántico. La Catedral récord: Es la catedral gótica más grande del mundo y la tercera iglesia cristiana tras San Pedro del Vaticano y San Pablo de Londres. La Giralda era el alminar de la mezquita almohade más alta del mundo. Cristóbal Colón está enterrado aquí... probablemente - hay 4 ciudades que reclaman sus restos.",
        kids: "¡Sevilla era la ciudad más rica del mundo entero hace mucho tiempo! Todo el oro de América venía aquí en barcos súper grandes. ¡Era como tener el tesoro más grande de piratas pero de verdad! ¡La iglesia más gigante! Tiene la iglesia más grande de España - ¡es tan grande que cabrían 3 campos de fútbol dentro! La torre súper alta antes era de cuando aquí vivían personas de otros países que rezaban diferente. Y aquí está enterrado el señor que descubrió América, ¡pero no están seguros de si es él de verdad!"
      },
      'Córdoba': {
        adult: "Córdoba fue la ciudad más grande de Europa occidental en el siglo X, con 500.000 habitantes cuando París tenía 25.000. Capital del Califato de Al-Andalus, era el centro intelectual más importante del mundo junto con Bagdad. Aquí se conservaron y tradujeron los textos clásicos griegos que Europa había perdido. La Mezquita imposible: Es la única mezquita-catedral del mundo. Tiene 856 columnas de mármol, jaspe y granito recicladas de templos romanos y visigodos. El mihrab está mal orientado a propósito - no apunta a La Meca sino al sur, hacia Damasco, sede del califato omeya.",
        kids: "¡Córdoba era la ciudad más grande y más lista de toda Europa hace muchísimo tiempo! Era súper famosa porque aquí vivían juntas personas de tres religiones diferentes que se llevaban súper bien y aprendían unos de otros. ¡La iglesia-mezquita súper rara! Es súper especial porque es una mezquita y una iglesia a la vez - ¡como si fuera dos casas de rezar en una! Tiene más de 800 columnas súper bonitas que son todas diferentes porque las cogieron de edificios súper antiguos de romanos y otros pueblos."
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
