'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-black/20 backdrop-blur-md border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center mb-4"
            >
              <span className="text-3xl mr-3">🌍</span>
              <h3 className="text-2xl font-bold text-white">60secondstrip</h3>
            </motion.div>
            <p className="text-white/80 mb-6 max-w-md">
              Descubre el mundo en 60 segundos. Una aplicación visual, mobile-first, 
              para explorar lugares increíbles cerca de ti.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://twitter.com/60secondstrip"
                className="glass rounded-full p-3"
              >
                <span className="text-xl">🐦</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://instagram.com/60secondstrip"
                className="glass rounded-full p-3"
              >
                <span className="text-xl">📷</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://youtube.com/@60secondstrip"
                className="glass rounded-full p-3"
              >
                <span className="text-xl">📺</span>
              </motion.a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Explorar</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/madrid" className="text-white/80 hover:text-white transition-colors">
                  Madrid
                </Link>
              </li>
              <li>
                <Link href="/barcelona" className="text-white/80 hover:text-white transition-colors">
                  Barcelona
                </Link>
              </li>
              <li>
                <Link href="/granada" className="text-white/80 hover:text-white transition-colors">
                  Granada
                </Link>
              </li>
            </ul>
          </div>

          {/* Enlaces legales */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacidad" className="text-white/80 hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-white/80 hover:text-white transition-colors">
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link href="/acerca" className="text-white/80 hover:text-white transition-colors">
                  Acerca de Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-white/80 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} 60secondstrip. Todos los derechos reservados.
            </p>
            <p className="text-white/60 text-sm mt-2 md:mt-0">
              Hecho con ❤️ en Madrid, España
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
