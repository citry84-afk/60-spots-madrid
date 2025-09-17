export interface Spot {
  id: string;
  name: string;
  coordinates: [number, number]; // [lat, lng]
  distance?: number;
  category: string;
  imageUrl: string;
  adultContent: {
    videoUrl: string;
    curiosityFacts: string[];
  };
  kidsContent: {
    videoUrl: string;
    curiosityFacts: string[];
  };
}

export const madridSpots: Spot[] = [
  {
    id: 'plaza-mayor',
    name: 'Plaza Mayor',
    coordinates: [40.4155, -3.7074],
    category: 'Histórico',
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=600&fit=crop',
    adultContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        'Construida en 1619, fue el centro comercial de Madrid durante siglos',
        'Aquí se celebraban autos de fe de la Inquisición española',
        'Sobrevivió a 3 incendios devastadores en su historia',
        'Las 9 puertas de acceso representan las 9 provincias de Castilla'
      ]
    },
    kidsContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        '¡Es como un patio gigante de 129 metros de largo!',
        'Tiene 9 puertas mágicas para entrar',
        'Antes aquí se vendían cosas raras como dragones de papel',
        '¡Los edificios son todos del mismo color rojizo!'
      ]
    }
  },
  {
    id: 'templo-debod',
    name: 'Templo de Debod',
    coordinates: [40.4240, -3.7177],
    category: 'Místico',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    adultContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        'Templo egipcio de 2,200 años regalado por Egipto a España',
        'Fue desmontado piedra por piedra en Asuán y reconstruido aquí',
        'Se salvó de quedar bajo las aguas de la presa de Asuán',
        'La orientación original se mantiene perfectamente en Madrid'
      ]
    },
    kidsContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        '¡Es un templo egipcio de verdad en Madrid!',
        'Tiene 2,200 años, ¡más viejo que los abuelos!',
        'Vino desde Egipto en pedacitos y lo armaron aquí',
        '¡Se ve súper mágico al atardecer!'
      ]
    }
  },
  {
    id: 'palacio-real',
    name: 'Palacio Real',
    coordinates: [40.4170, -3.7144],
    category: 'Real',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    adultContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        'Tiene 3,418 habitaciones, más que cualquier palacio europeo',
        'Alberga la colección de Stradivarius más importante del mundo',
        'El Salón del Trono tiene 4 metros de altura',
        'Fue residencia real hasta 1931, ahora es museo'
      ]
    },
    kidsContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        '¡Tiene 3,418 habitaciones! ¡Imagínate limpiar eso!',
        'Aquí vivían reyes y reinas de verdad',
        'Tiene violines súper especiales que suenan mágico',
        '¡Es más grande que 100 casas juntas!'
      ]
    }
  },
  {
    id: 'retiro',
    name: 'Parque del Retiro',
    coordinates: [40.4153, -3.6844],
    category: 'Naturaleza',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    adultContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        'Era el jardín privado de los reyes hasta 1868',
        'Tiene 15,000 árboles, algunos de 400 años',
        'El Palacio de Cristal se inspiró en el Crystal Palace de Londres',
        'Durante la Guerra Civil fue campo de batalla'
      ]
    },
    kidsContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        '¡Era el jardín secreto de los reyes!',
        'Tiene 15,000 árboles, ¡un bosque gigante!',
        'Hay un palacio de cristal súper brillante',
        '¡Puedes montar en barca en el estanque!'
      ]
    }
  },
  {
    id: 'puerta-sol',
    name: 'Puerta del Sol',
    coordinates: [40.4170, -3.7034],
    category: 'Céntrico',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    adultContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        'Kilómetro 0 de todas las carreteras españolas',
        'Aquí se proclamó la Constitución de 1812',
        'La estatua del Oso y el Madroño es símbolo de Madrid',
        'Cada Nochevieja miles de personas comen uvas aquí'
      ]
    },
    kidsContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        '¡Es el centro de España! Todas las carreteras empiezan aquí',
        'Hay un oso y un árbol de fresas gigante',
        '¡En Nochevieja todo el mundo come uvas aquí!',
        '¡Es la plaza más famosa de Madrid!'
      ]
    }
  },
  {
    id: 'museo-prado',
    name: 'Museo del Prado',
    coordinates: [40.4138, -3.6921],
    category: 'Arte',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    adultContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        'Tiene la colección más completa de Velázquez y Goya',
        'Alberga 8,000 pinturas, solo expone 1,700',
        'El edificio original era un gabinete de ciencias naturales',
        'Las Meninas de Velázquez es la obra más famosa'
      ]
    },
    kidsContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        '¡Tiene 8,000 cuadros! ¡Más que estrellas en el cielo!',
        'Hay cuadros de princesas y caballeros',
        '¡Las Meninas son súper famosas en todo el mundo!',
        '¡Es como un castillo lleno de arte!'
      ]
    }
  },
  {
    id: 'gran-via',
    name: 'Gran Vía',
    coordinates: [40.4194, -3.7072],
    category: 'Urbano',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    adultContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        'Se construyó demoliendo 312 casas y 14 calles',
        'Fue la primera calle con semáforos de Madrid',
        'El Edificio Telefónica fue el primer rascacielos de Europa',
        'Se llama "Broadway madrileño" por sus teatros'
      ]
    },
    kidsContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        '¡Es la calle más famosa de Madrid!',
        'Tiene edificios súper altos como rascacielos',
        '¡Hay teatros donde actúan princesas y superhéroes!',
        '¡Es súper brillante por las noches!'
      ]
    }
  },
  {
    id: 'mercado-san-miguel',
    name: 'Mercado de San Miguel',
    coordinates: [40.4150, -3.7083],
    category: 'Gastronomía',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    adultContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        'Estructura de hierro de 1916, estilo modernista',
        'Fue el primer mercado gourmet de Madrid',
        'Tiene 33 puestos especializados en productos premium',
        'El edificio es Monumento Histórico-Artístico'
      ]
    },
    kidsContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        '¡Es como un castillo de comida deliciosa!',
        'Tiene 33 tiendas de comida súper rica',
        '¡El edificio es de hierro y cristal brillante!',
        '¡Hueles comida rica desde la calle!'
      ]
    }
  },
  {
    id: 'casa-botines',
    name: 'Casa Botines',
    coordinates: [40.4200, -3.7100],
    category: 'Arquitectura',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    adultContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        'Diseñada por Gaudí en 1892, única obra suya en Madrid',
        'Era almacén de tejidos, ahora es museo y oficinas',
        'Combina estilo neogótico con modernismo catalán',
        'Tiene 4 plantas y sótano, estructura de hierro'
      ]
    },
    kidsContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        '¡La diseñó Gaudí, el arquitecto más creativo!',
        '¡Es súper diferente a todos los edificios!',
        'Antes vendían telas de colores bonitos',
        '¡Parece un castillo de cuento!'
      ]
    }
  },
  {
    id: 'plaza-cibeles',
    name: 'Plaza de Cibeles',
    coordinates: [40.4192, -3.6932],
    category: 'Monumental',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    adultContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        'La fuente de Cibeles data de 1782',
        'El Palacio de Cibeles es obra de Antonio Palacios',
        'Aquí celebran sus títulos el Real Madrid y Atlético',
        'La diosa Cibeles representa la fertilidad y la naturaleza'
      ]
    },
    kidsContent: {
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      curiosityFacts: [
        '¡Hay una diosa en una carroza con leones!',
        '¡Los equipos de fútbol celebran aquí cuando ganan!',
        '¡El palacio es súper grande y bonito!',
        '¡La fuente tiene agua que brilla!'
      ]
    }
  }
];

// Función para calcular distancia entre dos puntos
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c * 1000; // Distancia en metros
}

// Función para obtener spots cercanos ordenados por distancia
export function getNearbySpots(
  userLat: number,
  userLng: number,
  maxDistance: number = 5000
): Spot[] {
  return madridSpots
    .map(spot => ({
      ...spot,
      distance: calculateDistance(userLat, userLng, spot.coordinates[0], spot.coordinates[1])
    }))
    .filter(spot => spot.distance! <= maxDistance)
    .sort((a, b) => a.distance! - b.distance!);
}
