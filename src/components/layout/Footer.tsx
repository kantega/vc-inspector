'use client';
import { usePathname } from 'next/navigation';
import FeedbackBox from '../notices/FeedbackBox';
import { Facebook, InstagramIcon, Linkedin, TwitterIcon } from 'lucide-react';
import kantegaLogo from '@/public/kantega-logo.svg';
import inspectorLogo from '@/public/inspector-logo-purple.svg';
import Image from 'next/image';

/**
 * Component on top of page to select between mobile or desktop navigation
 * Drawer up to tailwinds medium size. Bar above that.
 * Needs to be a client component to be able to get path name
 */
export default function Footer() {
  const pathName = usePathname();
  return (
    <footer className="flex w-screen flex-col gap-4 bg-background pb-32">
      <FeedbackBox />
      <div className="flex w-full items-center justify-center gap-4 text-sm text-purple-800 ">
        <Image src={inspectorLogo} alt="Kantega Logo" width={100} />
        by
        <Image src={kantegaLogo} alt="Kantega Logo" width={100} />
      </div>
      <div className="flex w-full flex-col items-center justify-center ">
        <p>Poirot is developed by Kantega. Get in touch if you want to x y or zzz.</p>
        <p>post@kantega.no - +47 22 44 22 00</p>
      </div>

      <div className="flex w-full justify-center gap-4 py-10">
        <Linkedin size={24} />
        <TwitterIcon size={24} />
        <Facebook size={24} />
        <InstagramIcon size={24} />
      </div>
    </footer>
  );
}
