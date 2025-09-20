const fs = require('fs');

// URLs específicas para cada POI
const poiImages = {
  'plaza-mayor': 'https://images.unsplash.com/photo-1513635269975-59663e0ae4c0?w=1200&h=800&fit=crop&q=80',
  'palacio-real': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=80',
  'puerta-alcala': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&q=80',
  'retiro': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop&q=80',
  'templo-debod': 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&h=800&fit=crop&q=80',
  'sagrada-familia': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=800&fit=crop&q=80',
  'park-guell': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=80',
  'casa-batllo': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=80',
  'alhambra': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=80',
  'generalife': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=80',
  'catedral-sevilla': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=80',
  'alcazar-sevilla': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=80',
  'mezquita-cordoba': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=80',
  'alcazar-cordoba': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=80'
};

// Leer el manifest
const manifestPath = './public/content/manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Actualizar imágenes de POIs
manifest.cities.forEach(city => {
  city.pois.forEach(poi => {
    if (poiImages[poi.id]) {
      poi.imageUrl = poiImages[poi.id];
      console.log(`Updated ${poi.name} with specific image`);
    }
  });
});

// Escribir el manifest actualizado
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('POI images updated successfully!');
