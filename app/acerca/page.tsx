'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Users, Heart, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function AcercaPage() {
  return (
    <div className="min-h-screen bg-gradient-aurora">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 shadow-ios-xl"
        >
          <div className="flex items-center mb-8">
            <Link href="/" className="mr-4 p-2 glass rounded-full hover:scale-105 transition-transform">
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <h1 className="text-3xl font-bold text-white">Acerca de 60secondstrip</h1>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="text-center mb-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-8xl mb-6"
              >
                🌍
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-4">Descubre el mundo en 60 segundos</h2>
              <p className="text-xl text-white/90">
                Una aplicación visual, mobile-first, para descubrir lugares y curiosidades cerca de ti en 60 segundos.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mb-4">Nuestra Misión</h2>
            <p className="text-white/90 mb-6">
              Creemos que viajar y descubrir nuevos lugares no debería ser complicado. 60secondstrip nació de la idea de hacer el turismo accesible, rápido y emocionante para todos. Queremos que cada persona pueda descubrir la magia de un lugar en solo 60 segundos, sin importar si es un turista experimentado o alguien que explora su propia ciudad.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">¿Qué nos hace diferentes?</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center mb-4">
                  <Clock className="w-8 h-8 text-ios-blue mr-3" />
                  <h3 className="text-xl font-semibold text-white">60 Segundos</h3>
                </div>
                <p className="text-white/90">
                  Cada lugar se presenta en vídeos cortos y dinámicos que capturan la esencia en solo un minuto.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center mb-4">
                  <MapPin className="w-8 h-8 text-green-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Ubicación Inteligente</h3>
                </div>
                <p className="text-white/90">
                  Descubre lugares increíbles cerca de ti usando GPS o explora ciudades específicas.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center mb-4">
                  <Users className="w-8 h-8 text-purple-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Para Todos</h3>
                </div>
                <p className="text-white/90">
                  Contenido adaptado para adultos y niños, haciendo que cada experiencia sea relevante.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center mb-4">
                  <Heart className="w-8 h-8 text-pink-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Offline First</h3>
                </div>
                <p className="text-white/90">
                  Funciona sin conexión a internet, perfecto para explorar sin preocuparte por la cobertura.
                </p>
              </motion.div>
            </div>

            <h2 className="text-2xl font-semibold text-white mb-4">Nuestra Historia</h2>
            <p className="text-white/90 mb-6">
              60secondstrip comenzó como un proyecto personal para hacer el turismo más accesible. Después de viajar por España y experimentar la frustración de no tener información rápida y visual sobre los lugares que visitaba, decidimos crear una solución.
            </p>
            <p className="text-white/90 mb-6">
              Empezamos con Madrid, creando vídeos cortos y contenido adaptado para diferentes audiencias. Nuestra visión es expandirnos por toda España y eventualmente por el mundo, siempre manteniendo nuestra filosofía de simplicidad y accesibilidad.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">Nuestro Equipo</h2>
            <p className="text-white/90 mb-6">
              Somos un equipo apasionado por el turismo, la tecnología y la educación. Creemos que la mejor manera de aprender sobre un lugar es experimentándolo, y nuestros vídeos de 60 segundos están diseñados para despertar esa curiosidad y ganas de explorar.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">Tecnología</h2>
            <p className="text-white/90 mb-6">
              Utilizamos las últimas tecnologías web para crear una experiencia fluida y rápida. Nuestra aplicación está construida con Next.js, optimizada para móviles y diseñada para funcionar como una Progressive Web App (PWA).
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">Contacto</h2>
            <p className="text-white/90 mb-6">
              ¿Tienes preguntas, sugerencias o quieres colaborar con nosotros? Nos encantaría escucharte:
            </p>
            <div className="glass rounded-2xl p-6">
              <p className="text-white/90 mb-2">
                <strong>Email:</strong> hola@60secondstrip.com
              </p>
              <p className="text-white/90 mb-2">
                <strong>Twitter:</strong> @60secondstrip
              </p>
              <p className="text-white/90">
                <strong>Ubicación:</strong> Madrid, España
              </p>
            </div>

            <div className="text-center mt-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <Link href="/" className="btn-primary px-8 py-3 text-lg">
                  Comenzar a Explorar
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
