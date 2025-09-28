'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const faqs = [
  {
    question: '¿Qué es 60secondstrip?',
    answer: '60secondstrip es una aplicación móvil y web que te permite descubrir lugares increíbles cerca de ti a través de vídeos cortos de 60 segundos. Nuestra misión es hacer el turismo accesible, rápido y emocionante para todos, combinando tecnología moderna con contenido de calidad.'
  },
  {
    question: '¿Cómo funciona la aplicación?',
    answer: 'La aplicación utiliza tu ubicación GPS para mostrar lugares de interés cercanos, o puedes explorar ciudades específicas. Cada lugar incluye un vídeo de 60 segundos, información detallada, curiosidades históricas y contenido adaptado tanto para adultos como para niños.'
  },
  {
    question: '¿Es gratuita la aplicación?',
    answer: 'Sí, 60secondstrip es completamente gratuita. No hay costos de descarga, suscripciones ocultas ni compras dentro de la aplicación. Creemos que descubrir el mundo debería ser accesible para todos.'
  },
  {
    question: '¿Funciona sin conexión a internet?',
    answer: 'Sí, 60secondstrip está diseñada como una Progressive Web App (PWA) que funciona offline. Una vez que descargues el contenido, podrás explorar lugares y ver vídeos sin necesidad de conexión a internet, perfecto para viajes internacionales.'
  },
  {
    question: '¿Qué ciudades están disponibles?',
    answer: 'Actualmente tenemos contenido detallado para Madrid, Barcelona, Granada, Sevilla y Córdoba. Estamos trabajando constantemente para añadir más ciudades españolas y europeas. Cada ciudad incluye sus lugares más emblemáticos y secretos mejor guardados.'
  },
  {
    question: '¿Cómo se crean los vídeos de 60 segundos?',
    answer: 'Nuestros vídeos son creados por un equipo de profesionales que incluye guías turísticos, historiadores y videógrafos especializados. Cada vídeo está cuidadosamente editado para capturar la esencia del lugar en exactamente 60 segundos, combinando información relevante con imágenes impactantes.'
  },
  {
    question: '¿Puedo sugerir nuevos lugares?',
    answer: '¡Por supuesto! Nos encanta recibir sugerencias de nuestros usuarios. Puedes contactarnos a través de nuestra página de contacto o enviarnos un email a hola@60secondstrip.com con tus recomendaciones. Revisamos todas las sugerencias y las consideramos para futuras actualizaciones.'
  },
  {
    question: '¿Hay contenido para niños?',
    answer: 'Sí, cada lugar incluye contenido específicamente adaptado para niños. Nuestros vídeos y descripciones para niños utilizan un lenguaje más simple, incluyen curiosidades divertidas y están diseñados para despertar su curiosidad y amor por la exploración.'
  },
  {
    question: '¿Cómo puedo contactar con el equipo?',
    answer: 'Puedes contactarnos de varias maneras: a través de nuestro formulario de contacto en la web, enviando un email a hola@60secondstrip.com, o siguiéndonos en nuestras redes sociales (@60secondstrip en Twitter, Instagram y YouTube). Respondemos a todos los mensajes en 24-48 horas.'
  },
  {
    question: '¿La aplicación está disponible en otros idiomas?',
    answer: 'Actualmente 60secondstrip está disponible en español, pero estamos trabajando en versiones en inglés, francés e italiano. Si necesitas la aplicación en otro idioma, puedes contactarnos y te notificaremos cuando esté disponible.'
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Preguntas Frecuentes</h1>
              <p className="text-white/80">Encuentra respuestas a las preguntas más comunes sobre 60secondstrip</p>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-white" />
                    ) : (
                      <Plus className="w-5 h-5 text-white" />
                    )}
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-white/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿No encuentras la respuesta que buscas?
              </h3>
              <p className="text-white/80 mb-6">
                Nuestro equipo está aquí para ayudarte. Contáctanos y te responderemos lo antes posible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-6 py-3"
                >
                  <Link href="/contacto">Contactar Soporte</Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary px-6 py-3"
                >
                  <Link href="/acerca">Conocer Más</Link>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
