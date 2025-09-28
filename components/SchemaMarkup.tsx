'use client';

export default function SchemaMarkup() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "60secondstrip",
    "description": "Descubre el mundo en 60 segundos. Aplicación visual, mobile-first, para explorar lugares increíbles cerca de ti.",
    "url": "https://60secondstrip-app.netlify.app",
    "logo": "https://60secondstrip-app.netlify.app/icon-512x512.png",
    "sameAs": [
      "https://twitter.com/60secondstrip",
      "https://instagram.com/60secondstrip",
      "https://youtube.com/@60secondstrip"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+34-600-000-000",
      "contactType": "customer service",
      "email": "hola@60secondstrip.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Madrid",
      "addressCountry": "ES"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "60secondstrip",
    "description": "Aplicación de viajes y turismo para descubrir lugares increíbles en 60 segundos",
    "url": "https://60secondstrip-app.netlify.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://60secondstrip-app.netlify.app/buscar?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const mobileAppSchema = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "name": "60secondstrip",
    "description": "Descubre el mundo en 60 segundos. Aplicación móvil para explorar lugares increíbles",
    "operatingSystem": "iOS, Android",
    "applicationCategory": "TravelApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://60secondstrip-app.netlify.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://60secondstrip-app.netlify.app/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Categorías",
        "item": "https://60secondstrip-app.netlify.app/categorias"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(mobileAppSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
    </>
  );
}
