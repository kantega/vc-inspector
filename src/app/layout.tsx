import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Poirot',
  description: 'Poirot is a tool for inspecting and verifying verifiable credentials.',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '192x192',
      url: '/favicon/android-chrome-192x192.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/android-chrome-512x512.png',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          'relative flex flex-col justify-center bg-gradient-to-b from-purple-kantega-700 via-purple-kantega-600 via-[604px] to-light-purple to-[604px]',
        )}
      >
        <Header />
        <main className="container mx-auto mb-60 mt-16 flex min-h-screen flex-col gap-3">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
