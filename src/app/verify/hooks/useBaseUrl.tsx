'use client';
import { useState, useEffect } from 'react';

export function useBaseUrl() {
  const [baseUrl, setBaseUrl] = useState('unknown111'); // Default to 'unknown' for SSR

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin); // Safely set the base URL on the client
    } else {
      setBaseUrl('unknown2');
    }
  }, []);

  return baseUrl;
}
