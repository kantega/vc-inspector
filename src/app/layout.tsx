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
  title: 'Vc Inspector',
  description: 'Generated by create next app',
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
          'relative flex flex-col justify-center bg-gradient-to-b from-purple-kantega-600 via-purple-kantega-700 via-25% to-light-purple to-25%',
        )}
      >
        <Header />
        <main className="container mx-auto mb-60 mt-16 flex min-h-screen flex-col gap-2">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
