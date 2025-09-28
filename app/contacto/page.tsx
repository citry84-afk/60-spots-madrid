'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    alert('¡Gracias por tu mensaje! Te responderemos pronto.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
            <h1 className="text-3xl font-bold text-white">Contacto</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Información de contacto */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">¡Hablemos!</h2>
              <p className="text-white/90 mb-8">
                ¿Tienes preguntas, sugerencias o quieres colaborar con nosotros? 
                Nos encantaría escucharte y ayudarte en lo que necesites.
              </p>

              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center glass rounded-2xl p-4"
                >
                  <Mail className="w-6 h-6 text-ios-blue mr-4" />
                  <div>
                    <h3 className="font-semibold text-white">Email</h3>
                    <p className="text-white/90">hola@60secondstrip.com</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center glass rounded-2xl p-4"
                >
                  <Phone className="w-6 h-6 text-green-500 mr-4" />
                  <div>
                    <h3 className="font-semibold text-white">Teléfono</h3>
                    <p className="text-white/90">+34 600 000 000</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center glass rounded-2xl p-4"
                >
                  <MapPin className="w-6 h-6 text-purple-500 mr-4" />
                  <div>
                    <h3 className="font-semibold text-white">Ubicación</h3>
                    <p className="text-white/90">Madrid, España</p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Redes Sociales</h3>
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://twitter.com/60secondstrip"
                    className="glass rounded-full p-3"
                  >
                    <span className="text-2xl">🐦</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://instagram.com/60secondstrip"
                    className="glass rounded-full p-3"
                  >
                    <span className="text-2xl">📷</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://youtube.com/@60secondstrip"
                    className="glass rounded-full p-3"
                  >
                    <span className="text-2xl">📺</span>
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Envíanos un mensaje</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 glass rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-ios-blue"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 glass rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-ios-blue"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white font-medium mb-2">
                    Asunto *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 glass rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-ios-blue"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 glass rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-ios-blue resize-none"
                    placeholder="Cuéntanos más detalles..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full btn-primary py-4 text-lg flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Mensaje
                </motion.button>
              </form>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/70 text-sm">
              Tiempo de respuesta típico: 24-48 horas
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
