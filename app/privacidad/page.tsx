'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacidadPage() {
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
            <h1 className="text-3xl font-bold text-white">Política de Privacidad</h1>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/90 mb-6">
              <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">1. Información que recopilamos</h2>
            <p className="text-white/90 mb-6">
              En 60secondstrip recopilamos información limitada para proporcionar nuestros servicios:
            </p>
            <ul className="text-white/90 mb-6 list-disc pl-6">
              <li>Ubicación geográfica (opcional) para mostrar contenido relevante</li>
              <li>Datos de uso de la aplicación para mejorar la experiencia</li>
              <li>Información técnica del dispositivo (tipo de navegador, sistema operativo)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mb-4">2. Cómo utilizamos tu información</h2>
            <p className="text-white/90 mb-6">
              Utilizamos la información recopilada para:
            </p>
            <ul className="text-white/90 mb-6 list-disc pl-6">
              <li>Mostrar contenido personalizado basado en tu ubicación</li>
              <li>Mejorar la funcionalidad y rendimiento de la aplicación</li>
              <li>Analizar el uso para optimizar nuestros servicios</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mb-4">3. Cookies y tecnologías similares</h2>
            <p className="text-white/90 mb-6">
              Utilizamos cookies y tecnologías similares para:
            </p>
            <ul className="text-white/90 mb-6 list-disc pl-6">
              <li>Recordar tus preferencias de idioma y modo (adulto/niño)</li>
              <li>Mejorar la velocidad de carga de la aplicación</li>
              <li>Analizar el uso de la aplicación de forma anónima</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mb-4">4. Compartir información</h2>
            <p className="text-white/90 mb-6">
              No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto:
            </p>
            <ul className="text-white/90 mb-6 list-disc pl-6">
              <li>Cuando sea requerido por ley</li>
              <li>Para proteger nuestros derechos legales</li>
              <li>Con proveedores de servicios que nos ayudan a operar la aplicación</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mb-4">5. Seguridad de los datos</h2>
            <p className="text-white/90 mb-6">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra acceso no autorizado, alteración, divulgación o destrucción.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">6. Tus derechos</h2>
            <p className="text-white/90 mb-6">
              Tienes derecho a:
            </p>
            <ul className="text-white/90 mb-6 list-disc pl-6">
              <li>Acceder a tu información personal</li>
              <li>Rectificar datos inexactos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento de tus datos</li>
              <li>Retirar tu consentimiento en cualquier momento</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mb-4">7. Contacto</h2>
            <p className="text-white/90 mb-6">
              Si tienes preguntas sobre esta Política de Privacidad, puedes contactarnos en:
            </p>
            <p className="text-white/90 mb-6">
              <strong>Email:</strong> privacidad@60secondstrip.com<br />
              <strong>Dirección:</strong> Madrid, España
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">8. Cambios en esta política</h2>
            <p className="text-white/90 mb-6">
              Nos reservamos el derecho de actualizar esta Política de Privacidad. Te notificaremos cualquier cambio significativo a través de la aplicación o por email.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
