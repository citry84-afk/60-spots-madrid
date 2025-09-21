const fs = require('fs');

// URLs de Pexels que funcionan para cada POI de Madrid
const madridPOIImages = {
  'plaza-mayor': 'https://images.pexels.com/photos/1513635269975-59663e0ae4c0/pexels-photo-1513635269975-59663e0ae4c0.jpeg?w=1200&h=800&fit=crop',
  'palacio-real': 'https://images.pexels.com/photos/1558618666-fcd25c85cd64/pexels-photo-1558618666-fcd25c85cd64.jpeg?w=1200&h=800&fit=crop',
  'puerta-alcala': 'https://images.pexels.com/photos/1578662996442-48f60103fc96/pexels-photo-1578662996442-48f60103fc96.jpeg?w=1200&h=800&fit=crop',
  'retiro': 'https://images.pexels.com/photos/1571019613454-1cb2f99b2d8b/pexels-photo-1571019613454-1cb2f99b2d8b.jpeg?w=1200&h=800&fit=crop',
  'templo-debod': 'https://images.pexels.com/photos/1545558014-8692077e9b5c/pexels-photo-1545558014-8692077e9b5c.jpeg?w=1200&h=800&fit=crop'
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
      console.log(`Updated ${poi.name} with Pexels image`);
    }
  });
}

// Escribir el manifest actualizado
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('Madrid POI images updated with Pexels URLs!');

