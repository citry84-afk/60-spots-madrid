'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Camera, Utensils, Palette, BookOpen } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    id: 'turismo',
    name: 'Turismo y Viajes',
    description: 'Descubre los mejores destinos, guías de viaje y consejos para explorar el mundo',
    icon: <MapPin className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500',
    count: 25,
    articles: [
      'Guía Completa de Madrid: Los 20 Lugares Imprescindibles',
      'Barcelona en 3 Días: Itinerario Perfecto',
      'Sevilla: La Ciudad de las Mil Culturas',
      'Granada: Donde Oriente y Occidente se Encuentran'
    ]
  },
  {
    id: 'cultura',
    name: 'Cultura y Arte',
    description: 'Explora museos, galerías, tradiciones y manifestaciones culturales únicas',
    icon: <Palette className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
    count: 18,
    articles: [
      'Los Secretos Mejor Guardados del Arte en Madrid',
      'Museos Imprescindibles de Barcelona',
      'El Flamenco: Patrimonio de la Humanidad',
      'Arquitectura Modernista en España'
    ]
  },
  {
    id: 'gastronomia',
    name: 'Gastronomía',
    description: 'Saborea la rica tradición culinaria española y descubre nuevos sabores',
    icon: <Utensils className="w-8 h-8" />,
    color: 'from-orange-500 to-red-500',
    count: 22,
    articles: [
      'Guía Gastronómica de Madrid: De Tabernas a Vanguardia',
      'La Ruta del Tapeo en Barcelona',
      'Paella Valenciana: Tradición y Evolución',
      'Vinos de España: Una Guía Completa'
    ]
  },
  {
    id: 'historia',
    name: 'Historia y Patrimonio',
    description: 'Sumérgete en la rica historia de España y sus monumentos históricos',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'from-amber-500 to-yellow-500',
    count: 15,
    articles: [
      'La Alhambra: Joya del Arte Islámico',
      'El Camino de Santiago: Ruta Milenaria',
      'Madrid de los Austrias: Historia Viva',
      'La Reconquista: 800 Años de Historia'
    ]
  },
  {
    id: 'fotografia',
    name: 'Fotografía',
    description: 'Captura los momentos más bellos de tus viajes con nuestros consejos',
    icon: <Camera className="w-8 h-8" />,
    color: 'from-green-500 to-teal-500',
    count: 12,
    articles: [
      'Fotografía de Viajes: Técnicas Profesionales',
      'Los Mejores Miradores de Madrid',
      'Fotografía Nocturna en Ciudades',
      'Retratos de Viaje: Captura Emociones'
    ]
  }
];

export default function CategoriasPage() {
  return (
    <div className="min-h-screen bg-gradient-aurora">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 shadow-ios-xl"
        >
          <div className="flex items-center mb-8">
            <Link href="/" className="mr-4 p-2 glass rounded-full hover:scale-105 transition-transform">
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Categorías</h1>
              <p className="text-white/80">Explora nuestros contenidos organizados por temas</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-2xl p-6 shadow-ios"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white mb-4`}>
                  {category.icon}
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-2">
                  {category.name}
                </h2>
                
                <p className="text-white/80 mb-4">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-white/70">
                    {category.count} artículos
                  </span>
                  <span className="text-xs text-white/50">
                    Actualizado recientemente
                  </span>
                </div>
                
                <div className="space-y-2 mb-6">
                  {category.articles.slice(0, 3).map((article, articleIndex) => (
                    <div key={articleIndex} className="flex items-center text-sm text-white/70">
                      <div className="w-2 h-2 bg-white/30 rounded-full mr-3"></div>
                      <span className="line-clamp-1">{article}</span>
                    </div>
                  ))}
                  {category.articles.length > 3 && (
                    <div className="text-sm text-white/50">
                      +{category.articles.length - 3} artículos más
                    </div>
                  )}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full btn-primary py-2"
                >
                  Explorar Categoría
                </motion.button>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿No encuentras lo que buscas?
              </h3>
              <p className="text-white/80 mb-6">
                Explora todos nuestros artículos o utiliza nuestro buscador para encontrar contenido específico
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-6 py-3"
                >
                  Ver Todos los Artículos
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary px-6 py-3"
                >
                  Buscar Contenido
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
