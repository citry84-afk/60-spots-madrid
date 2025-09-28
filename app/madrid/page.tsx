'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Star, Camera, Utensils } from 'lucide-react';
import Link from 'next/link';

const madridPOIs = [
  {
    name: 'Museo del Prado',
    category: 'Museo',
    description: 'El museo de arte más importante de España con obras de Velázquez, Goya y El Bosco',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Museo_del_Prado_2016_%2825347925710%29.jpg',
    rating: 4.8,
    time: '2-3 horas'
  },
  {
    name: 'Parque del Retiro',
    category: 'Naturaleza',
    description: 'El pulmón verde de Madrid con el Palacio de Cristal y el Estanque Grande',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80',
    rating: 4.7,
    time: '1-2 horas'
  },
  {
    name: 'Plaza Mayor',
    category: 'Histórico',
    description: 'El corazón histórico de Madrid con su arquitectura barroca única',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=600&fit=crop&q=80',
    rating: 4.6,
    time: '30 min'
  },
  {
    name: 'Gran Vía',
    category: 'Cultura',
    description: 'La avenida más famosa de Madrid con teatros y arquitectura ecléctica',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Gran_V%C3%ADa_Madrid_2016.jpg',
    rating: 4.5,
    time: '1 hora'
  }
];

const madridStats = {
  population: '6.7M',
  area: '604 km²',
  founded: '852 d.C.',
  climate: 'Continental',
  language: 'Español',
  currency: 'Euro'
};

export default function MadridPage() {
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
              <h1 className="text-4xl font-bold text-white mb-2">Madrid</h1>
              <p className="text-white/80">La capital de España y una de las ciudades más vibrantes de Europa</p>
            </div>
          </div>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="aspect-video rounded-2xl overflow-hidden mb-6"
              >
                <img
                  src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=600&fit=crop&q=80"
                  alt="Madrid"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Descubre Madrid en 60 Segundos
              </h2>
              <p className="text-white/90 text-lg leading-relaxed">
                Madrid, la vibrante capital de España, es una ciudad que combina a la perfección la rica historia de sus calles empedradas con la modernidad de una metrópoli europea de primer nivel. Con más de 6.7 millones de habitantes en su área metropolitana, Madrid se erige como el corazón político, cultural y económico de España.
              </p>
              <p className="text-white/90 leading-relaxed">
                La ciudad ofrece una experiencia única que cautiva tanto a visitantes como a residentes, con sus museos de clase mundial, su gastronomía excepcional, su vida nocturna vibrante y su rico patrimonio histórico que se extiende desde la época medieval hasta la actualidad.
              </p>
            </motion.div>
          </div>

          {/* Estadísticas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12"
          >
            {Object.entries(madridStats).map(([key, value], index) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-2xl p-4 text-center"
              >
                <div className="text-2xl font-bold text-ios-blue mb-1">{value}</div>
                <div className="text-sm text-white/70 capitalize">{key}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Lugares de Interés */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8">Lugares Imprescindibles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {madridPOIs.map((poi, index) => (
                <motion.div
                  key={poi.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass rounded-2xl overflow-hidden shadow-ios"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={poi.image}
                      alt={poi.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-ios-blue/20 text-ios-blue text-sm rounded-full">
                        {poi.category}
                      </span>
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">{poi.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{poi.name}</h3>
                    <p className="text-white/80 mb-4">{poi.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-white/70">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{poi.time}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary px-4 py-2 text-sm"
                      >
                        Ver Detalles
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Información Adicional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Camera className="w-6 h-6 text-purple-500 mr-3" />
                <h3 className="text-xl font-bold text-white">Fotografía</h3>
              </div>
              <p className="text-white/80 text-sm">
                Madrid ofrece innumerables oportunidades fotográficas, desde la arquitectura histórica hasta la vida urbana contemporánea.
              </p>
            </div>
            
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Utensils className="w-6 h-6 text-orange-500 mr-3" />
                <h3 className="text-xl font-bold text-white">Gastronomía</h3>
              </div>
              <p className="text-white/80 text-sm">
                Desde tabernas centenarias hasta restaurantes de vanguardia, Madrid es un paraíso para los amantes de la buena comida.
              </p>
            </div>
            
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-green-500 mr-3" />
                <h3 className="text-xl font-bold text-white">Transporte</h3>
              </div>
              <p className="text-white/80 text-sm">
                Excelente red de metro y transporte público que conecta todos los puntos de interés de la ciudad.
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-4 text-lg"
            >
              Explorar Madrid Ahora
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
