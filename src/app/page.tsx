'use client';
import InspectionPage from '@/components/vc-inspection/InspectionPage';

export default function Home() {
  if (typeof window !== 'undefined' && window.location.hash !== '') {
    const token = window.location.hash.split('=')[1].trim();
    return <InspectionPage defaultToken={base64urlDecode(token)} />;
  }
  return <InspectionPage />;
}

const base64urlDecode = (input: string) => decodeURIComponent(input);
