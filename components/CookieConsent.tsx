'use client';

import { useEffect, useState } from 'react';

type ConsentState = 'granted' | 'denied' | null;

const STORAGE_KEY = 'cookie_consent_v1';

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? (localStorage.getItem(STORAGE_KEY) as ConsentState | null) : null;
    if (stored) {
      setConsent(stored);
      if (stored === 'granted') {
        enableAnalyticsConsent();
      } else if (stored === 'denied') {
        setAnalyticsDenied();
      }
    }
  }, []);

  const enableAnalyticsConsent = () => {
    // Consent Mode Update
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.gtag && window.gtag('consent', 'update', { ad_user_data: 'granted', ad_personalization: 'granted', ad_storage: 'granted', analytics_storage: 'granted' });
      // Señal propia para otros scripts
      // @ts-ignore
      window.__consentGranted = true;
    }
  };

  const setAnalyticsDenied = () => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.gtag && window.gtag('consent', 'update', { ad_user_data: 'denied', ad_personalization: 'denied', ad_storage: 'denied', analytics_storage: 'denied' });
      // @ts-ignore
      window.__consentGranted = false;
    }
  };

  const onAccept = () => {
    setConsent('granted');
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, 'granted');
    enableAnalyticsConsent();
  };

  const onDecline = () => {
    setConsent('denied');
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, 'denied');
    setAnalyticsDenied();
  };

  if (consent) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90]">
      <div className="mx-auto max-w-5xl m-4 glass rounded-2xl p-6 shadow-ios-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-white/90">
            <p className="font-semibold mb-1">Uso de cookies</p>
            <p className="text-sm">Utilizamos cookies para analizar el tráfico y mejorar tu experiencia. Puedes aceptar o rechazarlas.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={onDecline} className="btn-secondary px-4 py-2">Rechazar</button>
            <button onClick={onAccept} className="btn-primary px-4 py-2">Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  );
}



