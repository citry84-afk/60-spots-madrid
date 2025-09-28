'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TerminosPage() {
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
            <h1 className="text-3xl font-bold text-white">Términos de Servicio</h1>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/90 mb-6">
              <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">1. Aceptación de los Términos</h2>
            <p className="text-white/90 mb-6">
              Al acceder y utilizar la aplicación 60secondstrip, aceptas estar sujeto a estos Términos de Servicio y a todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguno de estos términos, no debes utilizar nuestra aplicación.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">2. Descripción del Servicio</h2>
            <p className="text-white/90 mb-6">
              60secondstrip es una aplicación móvil y web que proporciona información sobre lugares de interés, curiosidades y contenido multimedia relacionado con ubicaciones geográficas. Nuestro servicio incluye:
            </p>
            <ul className="text-white/90 mb-6 list-disc pl-6">
              <li>Vídeos informativos de 60 segundos sobre lugares de interés</li>
              <li>Información geográfica y de ubicación</li>
              <li>Contenido adaptado para diferentes audiencias (adultos y niños)</li>
              <li>Funcionalidades de navegación y mapas</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mb-4">3. Uso Aceptable</h2>
            <p className="text-white/90 mb-6">
              Al utilizar nuestra aplicación, te comprometes a:
            </p>
            <ul className="text-white/90 mb-6 list-disc pl-6">
              <li>Utilizar la aplicación únicamente para fines legales y de acuerdo con estos términos</li>
              <li>No interferir con el funcionamiento normal de la aplicación</li>
              <li>No intentar acceder a áreas restringidas de la aplicación</li>
              <li>No utilizar la aplicación para transmitir contenido ilegal, ofensivo o inapropiado</li>
              <li>Respetar los derechos de propiedad intelectual de terceros</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mb-4">4. Contenido y Propiedad Intelectual</h2>
            <p className="text-white/90 mb-6">
              Todo el contenido de la aplicación, incluyendo pero no limitado a textos, gráficos, imágenes, vídeos, audio, software y código fuente, es propiedad de 60secondstrip o de sus licenciantes y está protegido por las leyes de propiedad intelectual.
            </p>
            <p className="text-white/90 mb-6">
              No puedes copiar, modificar, distribuir, vender o crear trabajos derivados basados en nuestro contenido sin autorización expresa por escrito.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">5. Privacidad y Protección de Datos</h2>
            <p className="text-white/90 mb-6">
              Tu privacidad es importante para nosotros. El uso de tu información personal se rige por nuestra Política de Privacidad, que forma parte integral de estos Términos de Servicio.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">6. Limitación de Responsabilidad</h2>
            <p className="text-white/90 mb-6">
              60secondstrip se proporciona "tal como está" sin garantías de ningún tipo. No garantizamos que:
            </p>
            <ul className="text-white/90 mb-6 list-disc pl-6">
              <li>La aplicación esté libre de errores o interrupciones</li>
              <li>La información proporcionada sea completamente precisa o actualizada</li>
              <li>La aplicación sea compatible con todos los dispositivos</li>
            </ul>
            <p className="text-white/90 mb-6">
              En ningún caso 60secondstrip será responsable por daños directos, indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de usar la aplicación.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">7. Modificaciones del Servicio</h2>
            <p className="text-white/90 mb-6">
              Nos reservamos el derecho de modificar, suspender o discontinuar la aplicación o cualquier parte de ella en cualquier momento sin previo aviso. No seremos responsables ante ti o cualquier tercero por cualquier modificación, suspensión o discontinuación del servicio.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">8. Terminación</h2>
            <p className="text-white/90 mb-6">
              Podemos terminar o suspender tu acceso a la aplicación inmediatamente, sin previo aviso, por cualquier motivo, incluyendo si violas estos Términos de Servicio.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">9. Ley Aplicable</h2>
            <p className="text-white/90 mb-6">
              Estos Términos de Servicio se rigen por las leyes de España. Cualquier disputa relacionada con estos términos será resuelta en los tribunales competentes de Madrid, España.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">10. Contacto</h2>
            <p className="text-white/90 mb-6">
              Si tienes preguntas sobre estos Términos de Servicio, puedes contactarnos en:
            </p>
            <p className="text-white/90 mb-6">
              <strong>Email:</strong> legal@60secondstrip.com<br />
              <strong>Dirección:</strong> Madrid, España
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">11. Modificaciones de los Términos</h2>
            <p className="text-white/90 mb-6">
              Nos reservamos el derecho de modificar estos Términos de Servicio en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en la aplicación. Es tu responsabilidad revisar periódicamente estos términos.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
