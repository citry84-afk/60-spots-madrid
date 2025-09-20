const fs = require('fs');

// URLs específicas para cada ciudad
const cityImages = {
  'madrid-es': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=800&fit=crop&q=80',
  'barcelona-es': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=800&fit=crop&q=80',
  'granada-es': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=800&fit=crop&q=80',
  'sevilla-es': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=800&fit=crop&q=80',
  'cordoba-es': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=800&fit=crop&q=80'
};

// Leer el manifest
const manifestPath = './public/content/manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Actualizar imágenes de ciudades
manifest.cities.forEach(city => {
  if (cityImages[city.id]) {
    city.imageUrl = cityImages[city.id];
    console.log(`Updated ${city.name} with specific image`);
  }
});

// Escribir el manifest actualizado
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('City images updated successfully!');
