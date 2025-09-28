'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
  {
    id: 'madrid-guia-completa',
    title: 'Guía Completa de Madrid: Los 20 Lugares Imprescindibles que Debes Conocer',
    excerpt: 'Descubre los secretos mejor guardados de la capital española. Una guía exhaustiva con los lugares más emblemáticos, curiosidades históricas y consejos de expertos para vivir Madrid como un local.',
    content: `Madrid, la vibrante capital de España, es una ciudad que combina a la perfección la rica historia de sus calles empedradas con la modernidad de una metrópoli europea de primer nivel. Con más de 6.7 millones de habitantes en su área metropolitana, Madrid se erige como el corazón político, cultural y económico de España, ofreciendo una experiencia única que cautiva tanto a visitantes como a residentes.

## El Museo del Prado: Un Tesoro Universal

El Museo del Prado no es simplemente un museo; es un santuario del arte universal que alberga una de las colecciones más importantes del mundo. Con más de 8,000 pinturas, 700 esculturas y 4,800 grabados, este templo del arte representa la evolución de la pintura europea desde el siglo XII hasta el XIX.

Las Meninas de Velázquez, considerada por muchos como la obra maestra de la pintura universal, continúa despertando debates académicos sobre su composición, perspectiva y significado. La genialidad de Velázquez se manifiesta en cada pincelada, creando un juego de espejos y miradas que desafía la percepción del espectador.

El Jardín de las Delicias de El Bosco, una de las obras más enigmáticas de la historia del arte, presenta un tríptico que narra la creación del mundo, el pecado humano y el castigo eterno. Sus detalles microscópicos y criaturas fantásticas han inspirado a generaciones de artistas y continúan siendo objeto de interpretaciones académicas.

## El Parque del Retiro: Un Oasis Urbano

Con sus 125 hectáreas de extensión, el Parque del Retiro representa el pulmón verde de Madrid y uno de los espacios públicos más importantes de Europa. Originalmente concebido como jardín real en el siglo XVII, el Retiro ha evolucionado hasta convertirse en un museo al aire libre que combina naturaleza, arte y arquitectura.

El Palacio de Cristal, construido en 1887 para la Exposición de las Islas Filipinas, es una joya arquitectónica que ejemplifica la arquitectura de hierro y cristal del siglo XIX. Inspirado en el Crystal Palace de Londres, este invernadero de 22 metros de altura alberga exposiciones temporales que dialogan con la naturaleza circundante.

El Ángel Caído, una escultura de bronce de 2.65 metros de altura, es una de las pocas representaciones públicas de Lucifer en el mundo. Creada por Ricardo Bellver en 1877, esta obra maestra del realismo español representa la caída del ángel rebelde con una expresividad que trasciende el arte religioso tradicional.

## La Plaza Mayor: Corazón Histórico de Madrid

La Plaza Mayor, con sus 129 metros de largo por 94 de ancho, es el epicentro del Madrid histórico y uno de los mejores ejemplos de arquitectura barroca española. Construida entre 1617 y 1619 durante el reinado de Felipe III, esta plaza rectangular ha sido testigo de coronaciones, ejecuciones, corridas de toros y mercados que han marcado la historia de España.

La Casa de la Panadería, con sus magníficos frescos de Carlos Franco, domina el lado norte de la plaza y representa la evolución artística de Madrid a través de los siglos. Sus pinturas murales, que narran la historia de la ciudad, constituyen una obra de arte en sí misma que merece ser contemplada con detenimiento.

## La Gran Vía: Broadway Madrileño

La Gran Vía, conocida como el "Broadway madrileño", es la arteria principal que transformó Madrid en una ciudad moderna. Su construcción, iniciada en 1910, implicó el derribo de más de 300 casas y la reconfiguración completa del tejido urbano del centro histórico.

Esta avenida de 1.3 kilómetros de longitud combina estilos arquitectónicos que van desde el eclecticismo hasta el art déco, creando un museo al aire libre de la arquitectura del siglo XX. Edificios emblemáticos como el Edificio Telefónica, el Palacio de la Prensa y el Edificio Capitol representan la evolución del gusto arquitectónico madrileño.

## El Barrio de las Letras: Cuna de la Literatura Española

El Barrio de las Letras, también conocido como Barrio de las Musas, es el distrito literario por excelencia de Madrid. Aquí vivieron y trabajaron los grandes genios de la Edad de Oro española: Miguel de Cervantes, Lope de Vega, Francisco de Quevedo y Luis de Góngora.

Las calles de este barrio están impregnadas de literatura. Placas conmemorativas en el suelo recuerdan los versos más célebres de nuestros poetas, creando un paseo literario único en el mundo. La Casa de Lope de Vega, convertida en museo, permite revivir la atmósfera creativa del Siglo de Oro.

## Consejos Prácticos para Explorar Madrid

Para aprovechar al máximo tu visita a Madrid, te recomendamos:

1. **Planifica tu ruta**: Madrid es una ciudad extensa, por lo que es fundamental organizar las visitas por zonas geográficas.

2. **Utiliza el transporte público**: El metro de Madrid es uno de los más eficientes de Europa y te permitirá moverte rápidamente entre los diferentes puntos de interés.

3. **Reserva con antelación**: Los museos más importantes requieren reserva previa, especialmente durante la temporada alta.

4. **Explora los barrios**: Cada barrio de Madrid tiene su propia personalidad. No te limites al centro histórico.

5. **Disfruta de la gastronomía**: Madrid ofrece una oferta gastronómica excepcional, desde tabernas centenarias hasta restaurantes de vanguardia.

Madrid es una ciudad que se descubre poco a poco, donde cada calle cuenta una historia y cada plaza esconde un secreto. Su riqueza cultural, su patrimonio histórico y su vibrante vida contemporánea la convierten en un destino imprescindible para cualquier amante de la cultura y la historia.`,
    author: 'Equipo 60secondstrip',
    date: '2024-01-15',
    readTime: '12 min',
    tags: ['Madrid', 'Turismo', 'Cultura', 'Historia', 'Guía'],
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=600&fit=crop&q=80'
  },
  {
    id: 'arte-madrid-secretos',
    title: 'Los Secretos Mejor Guardados del Arte en Madrid: Más Allá del Prado',
    excerpt: 'Explora los rincones artísticos menos conocidos de Madrid. Desde galerías clandestinas hasta obras maestras ocultas en iglesias y palacios.',
    content: `Madrid, reconocida mundialmente por el Triángulo del Arte formado por el Prado, el Reina Sofía y el Thyssen, esconde una red de espacios artísticos que van mucho más allá de estos museos icónicos. La capital española alberga tesoros artísticos en lugares insospechados, desde iglesias barrocas hasta palacios privados, pasando por galerías de vanguardia y espacios alternativos que desafían las convenciones del arte tradicional.

## El Museo Lázaro Galdiano: Un Palacio de Coleccionista

Ubicado en el barrio de Salamanca, el Museo Lázaro Galdiano ocupa el palacio que fue residencia del coleccionista José Lázaro Galdiano. Esta joya arquitectónica alberga una de las colecciones privadas más importantes de España, con más de 12,000 piezas que abarcan desde la antigüedad hasta el siglo XX.

La colección incluye obras maestras de Goya, El Greco, Velázquez y Zurbarán, pero también piezas únicas como el "San Jerónimo" de Leonardo da Vinci, una de las pocas obras del genio renacentista en España. El museo destaca por su excepcional colección de artes decorativas, con piezas de orfebrería, textiles y cerámica que reflejan la evolución del gusto artístico español.

## El Museo Sorolla: La Casa-Taller del Pintor de la Luz

La casa-taller de Joaquín Sorolla, convertida en museo en 1932, ofrece una experiencia única para comprender el proceso creativo del pintor valenciano. Este espacio íntimo conserva el ambiente original donde Sorolla trabajó durante sus últimos años, con su estudio, biblioteca y jardín andaluz diseñado por el propio artista.

Sorolla, conocido como "el pintor de la luz", revolucionó la pintura española con su técnica impresionista y su obsesión por capturar los efectos de la luz mediterránea. El museo alberga más de 1,200 obras que documentan la evolución artística del pintor, desde sus primeros retratos hasta sus grandes composiciones de playas valencianas.

## El Museo del Romanticismo: Un Viaje al Siglo XIX

Ubicado en el palacio del marqués de Matallana, el Museo del Romanticismo recrea la atmósfera de una casa burguesa del siglo XIX. Sus salones, decorados con muebles, pinturas y objetos de la época, transportan al visitante a la España romántica de Larra, Espronceda y Bécquer.

La colección incluye obras de Federico de Madrazo, Antonio María Esquivel y Leonardo Alenza, artistas que definieron el romanticismo español. El museo destaca por su colección de miniaturas, abanicos y joyas que reflejan la moda y las costumbres de la época.

## El Museo Cerralbo: Un Palacio de Coleccionista

El palacio del marqués de Cerralbo, construido entre 1883 y 1893, es uno de los mejores ejemplos de arquitectura ecléctica en Madrid. Su propietario, Enrique de Aguilera y Gamboa, fue un coleccionista apasionado que reunió más de 50,000 piezas de arte, arqueología y artes decorativas.

El museo conserva la distribución original del palacio, con sus salones de recepción, biblioteca, armería y capilla privada. La colección incluye pinturas de El Greco, Zurbarán y Goya, así como una excepcional colección de armas y armaduras que rivaliza con la del Palacio Real.

## El Museo de Artes Decorativas: El Arte de Vivir

El Museo Nacional de Artes Decorativas, ubicado en el palacio de la duquesa de Santoña, documenta la evolución de las artes aplicadas en España desde el siglo XIV hasta la actualidad. Sus 40 salas exhiben más de 70,000 piezas que incluyen cerámica, textiles, muebles, joyas y objetos de uso cotidiano.

La colección de cerámica es especialmente notable, con piezas de Talavera, Manises y Alcora que representan la evolución de la cerámica española. El museo también alberga una importante colección de textiles, incluyendo tapices flamencos del siglo XVI y bordados del siglo XVIII.

## Galerías de Vanguardia y Espacios Alternativos

Madrid cuenta con una vibrante escena de galerías de arte contemporáneo que rivaliza con las capitales europeas más importantes. El barrio de Malasaña concentra numerosas galerías independientes que promueven artistas emergentes y experimentales.

La Galería Juana de Aizpuru, una de las más prestigiosas de España, ha sido pionera en la promoción del arte conceptual y la performance. Otras galerías destacadas incluyen Helga de Alvear, que representa a artistas internacionales de renombre, y Travesía Cuatro, especializada en arte latinoamericano contemporáneo.

## El Matadero: Arte en un Espacio Industrial

El Matadero Madrid, ubicado en el antiguo matadero municipal de Legazpi, es uno de los centros de arte contemporáneo más innovadores de Europa. Sus naves industriales del siglo XX han sido reconvertidas en espacios expositivos, teatros, cines y talleres de artistas.

Este espacio multidisciplinar alberga exposiciones temporales, performances, conciertos y festivales que exploran las fronteras entre el arte, la tecnología y la sociedad contemporánea. Su programación incluye artistas emergentes y consagrados, tanto nacionales como internacionales.

## Consejos para Explorar el Arte Oculto de Madrid

1. **Planifica tu ruta**: Muchos de estos museos están en barrios residenciales, por lo que es recomendable organizar las visitas por zonas.

2. **Consulta horarios**: Algunos museos tienen horarios especiales o requieren cita previa.

3. **Aprovecha las visitas guiadas**: Muchos museos ofrecen visitas temáticas que profundizan en aspectos específicos de sus colecciones.

4. **Explora los barrios**: Cada barrio de Madrid tiene su propia personalidad artística.

5. **Disfruta de la gastronomía**: Muchos museos tienen cafeterías o restaurantes que complementan la experiencia cultural.

Madrid es una ciudad que se descubre a través del arte, donde cada museo, galería o espacio cultural cuenta una historia diferente. Su riqueza artística, que va desde el arte clásico hasta las vanguardias más experimentales, la convierte en un destino imprescindible para cualquier amante del arte.`,
    author: 'Equipo 60secondstrip',
    date: '2024-01-10',
    readTime: '15 min',
    tags: ['Arte', 'Museos', 'Cultura', 'Madrid', 'Historia'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop&q=80'
  },
  {
    id: 'gastronomia-madrid-guia',
    title: 'Guía Gastronómica de Madrid: De las Tabernas Centenarias a la Vanguardia Culinaria',
    excerpt: 'Descubre la evolución gastronómica de Madrid a través de sus tabernas históricas, mercados tradicionales y restaurantes de vanguardia que han puesto a la capital en el mapa culinario mundial.',
    content: `Madrid, capital de España y epicentro de la gastronomía peninsular, ha experimentado una revolución culinaria sin precedentes en las últimas décadas. La ciudad que antaño se caracterizaba por su cocina tradicional y sus tabernas centenarias ha evolucionado hasta convertirse en uno de los destinos gastronómicos más importantes de Europa, con una oferta que abarca desde la cocina tradicional más auténtica hasta las creaciones más vanguardistas de la gastronomía molecular.

## La Tradición Tabernaria: El Alma de Madrid

Las tabernas madrileñas, con sus mesas de mármol, barriles de vino y jamones colgando del techo, representan el alma gastronómica de la capital. Estos establecimientos centenarios, muchos de los cuales han sobrevivido a guerras, crisis económicas y cambios sociales, mantienen viva la tradición culinaria más auténtica de Madrid.

La Taberna de la Daniela, fundada en 1908, es una de las tabernas más antiguas de Madrid y un auténtico museo viviente de la gastronomía tradicional. Sus paredes, decoradas con azulejos sevillanos y fotografías históricas, han sido testigo de más de un siglo de historia madrileña. Su cocido madrileño, preparado según la receta original, es una obra maestra de la cocina tradicional que requiere más de ocho horas de cocción lenta.

El Sobrino de Botín, reconocido por el Libro Guinness de los Récords como el restaurante más antiguo del mundo en funcionamiento continuo, ha servido sus especialidades desde 1725. Su cochinillo asado, cocinado en horno de leña según la tradición castellana, ha sido degustado por personalidades como Ernest Hemingway, quien inmortalizó el restaurante en su novela "Fiesta".

## Los Mercados Tradicionales: El Corazón de la Cocina Madrileña

Los mercados de Madrid, con sus puestos de productos frescos, sus charcuterías artesanales y sus bares de tapeo, constituyen el corazón de la cocina madrileña. Estos espacios, muchos de los cuales han sido renovados y modernizados, mantienen viva la tradición del comercio local y la gastronomía de proximidad.

El Mercado de San Miguel, ubicado en un edificio de hierro y cristal de 1916, es uno de los mercados gourmet más importantes de Europa. Sus más de 30 puestos ofrecen una selección exquisita de productos españoles e internacionales, desde jamones ibéricos de bellota hasta ostras de Galicia, pasando por quesos artesanales y vinos de las mejores bodegas del país.

El Mercado de la Cebada, uno de los mercados más antiguos de Madrid, mantiene su carácter tradicional con puestos de frutas, verduras, carnes y pescados frescos. Su bar de tapas, donde se puede degustar una amplia variedad de pinchos y raciones, es un punto de encuentro para madrileños y visitantes que buscan la autenticidad de la cocina tradicional.

## La Revolución Gastronómica: De la Tradición a la Vanguardia

En las últimas décadas, Madrid ha experimentado una revolución gastronómica que ha transformado la ciudad en un destino culinario de primer nivel. Chefs innovadores, muchos de los cuales han trabajado en los mejores restaurantes del mundo, han establecido sus cocinas en la capital, creando una escena gastronómica vibrante y diversa.

DiverXO, el restaurante de David Muñoz que ha obtenido tres estrellas Michelin, representa la vanguardia de la gastronomía española. Su cocina, que combina técnicas asiáticas con ingredientes españoles, ha revolucionado el panorama gastronómico madrileño y ha puesto a Madrid en el mapa de la gastronomía mundial.

Coque, dirigido por los hermanos Sandoval, es otro ejemplo de la innovación gastronómica madrileña. Su cocina, que explora las posibilidades de los ingredientes tradicionales españoles a través de técnicas modernas, ha sido reconocida con dos estrellas Michelin y ha establecido nuevos estándares en la gastronomía contemporánea.

## Los Barrios Gastronómicos: Una Ciudad de Sabores

Cada barrio de Madrid tiene su propia personalidad gastronómica, creando un mosaico de sabores y tradiciones que refleja la diversidad cultural de la capital.

El barrio de La Latina, con sus calles empedradas y sus plazas históricas, concentra algunas de las tabernas más tradicionales de Madrid. Sus bares de tapas, muchos de los cuales han mantenido su decoración original durante décadas, ofrecen una experiencia gastronómica auténtica que transporta al visitante a la Madrid de antaño.

El barrio de Malasaña, conocido por su ambiente alternativo y su vida nocturna, ha desarrollado una escena gastronómica joven e innovadora. Sus restaurantes, muchos de los cuales han sido abiertos por chefs jóvenes, ofrecen una cocina creativa que combina tradición e innovación.

El barrio de Salamanca, con sus calles elegantes y sus tiendas de lujo, alberga algunos de los restaurantes más sofisticados de Madrid. Sus establecimientos, muchos de los cuales han sido reconocidos con estrellas Michelin, ofrecen una experiencia gastronómica de alto nivel que rivaliza con las mejores capitales europeas.

## La Cocina de Mercado: La Nueva Tendencia

La cocina de mercado, que utiliza ingredientes frescos y de proximidad, ha ganado protagonismo en la escena gastronómica madrileña. Restaurantes como Ten Con Ten, que combina la tradición mediterránea con técnicas modernas, han popularizado esta tendencia que prioriza la calidad de los ingredientes y la sostenibilidad.

El Mercado de Antón Martín, renovado recientemente, alberga varios restaurantes que ejemplifican esta tendencia. Sus cocinas, que utilizan productos de los puestos del mercado, ofrecen una experiencia gastronómica auténtica que conecta directamente con la tradición culinaria madrileña.

## Consejos para Explorar la Gastronomía de Madrid

1. **Reserva con antelación**: Los restaurantes más populares requieren reserva, especialmente durante los fines de semana.

2. **Explora los barrios**: Cada barrio tiene su propia personalidad gastronómica.

3. **Prueba las tapas**: La tradición del tapeo es fundamental en la cultura gastronómica madrileña.

4. **Visita los mercados**: Los mercados ofrecen una experiencia gastronómica auténtica.

5. **Disfruta de la vida nocturna**: Madrid es una ciudad que vive de noche, y su oferta gastronómica nocturna es excepcional.

Madrid es una ciudad que se descubre a través de la comida, donde cada plato cuenta una historia y cada restaurante es un capítulo en la evolución gastronómica de la capital. Su riqueza culinaria, que abarca desde la tradición más auténtica hasta la vanguardia más innovadora, la convierte en un destino imprescindible para cualquier amante de la gastronomía.`,
    author: 'Equipo 60secondstrip',
    date: '2024-01-05',
    readTime: '18 min',
    tags: ['Gastronomía', 'Madrid', 'Restaurantes', 'Cultura', 'Tradición'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop&q=80'
  }
];

export default function BlogPage() {
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
              <h1 className="text-4xl font-bold text-white mb-2">Blog de Viajes</h1>
              <p className="text-white/80">Descubre el mundo a través de nuestros artículos y guías</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass rounded-2xl overflow-hidden shadow-ios"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-white/70 mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('es-ES')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-white/80 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/20 text-white text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full btn-primary py-2"
                  >
                    Leer Artículo
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-3 text-lg"
            >
              Ver Todos los Artículos
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
