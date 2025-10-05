'use client';

import Script from 'next/script';

// Reemplazar por tu ID real de GA4
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

export default function GoogleAnalytics() {
  return (
    <>
      {/* Consent Mode default: denied */}
      <Script id="ga-consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} 
          gtag('consent', 'default', {
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'ad_storage': 'denied',
            'analytics_storage': 'denied'
          });
          window.__consentGranted = false;
        `}
      </Script>

      {/* gtag loader */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />

      {/* Initialize GA only when consent is granted */}
      <Script id="ga-init" strategy="afterInteractive">
        {`
          function initGA(){
            if (!window.__gaInitialized && window.__consentGranted) {
              window.__gaInitialized = true;
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname
              });
            }
          }
          // If consent already granted from storage, init immediately (CookieConsent updates window.__consentGranted)
          if (window.__consentGranted) { initGA(); }
          // Also observe changes on consent flag
          Object.defineProperty(window, '__consentGranted', {
            set: function(v){ this.__cg = v; if(v) initGA(); },
            get: function(){ return this.__cg; }
          });
        `}
      </Script>
    </>
  );
}
