const fs = require('fs');

// URLs de imágenes que funcionan para cada POI de Madrid
const madridPOIImages = {
  'plaza-mayor': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=800&fit=crop&q=80',
  'palacio-real': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=800&fit=crop&q=80',
  'puerta-alcala': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=800&fit=crop&q=80',
  'retiro': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=800&fit=crop&q=80',
  'templo-debod': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=800&fit=crop&q=80'
};

// Leer el manifest
const manifestPath = './public/content/manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Actualizar imágenes de POIs de Madrid
const madridCity = manifest.cities.find(city => city.id === 'madrid-es');
if (madridCity) {
  madridCity.pois.forEach(poi => {
    if (madridPOIImages[poi.id]) {
      poi.imageUrl = madridPOIImages[poi.id];
      console.log(`Updated ${poi.name} with working image`);
    }
  });
}

// Escribir el manifest actualizado
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('Madrid POI images updated with working URLs!');
