'use client';
import { usePathname } from 'next/navigation';
import NavigationBar from './NavBar';
import NavigationDrawer from './NavDrawer';
import { useEffect } from 'react';
import matomoInit from './matomoInit.js';

export type NavigationLinks = {
  to: string;
  label: string;
};

const links: NavigationLinks[] = [
  {
    to: '/',
    label: 'Inspector',
  },
  {
    to: '/examples',
    label: 'Examples',
  },
  {
    to: '/introduction',
    label: 'Introduction',
  },
];

/**
 * Component on top of page to select between mobile or desktop navigation
 * Drawer up to tailwinds medium size. Bar above that.
 * Needs to be a client component to be able to get path name
 */
export default function Header() {
  useEffect(() => {
    matomoInit();
  }, []);

  const pathName = usePathname();
  return (
    <div className="p-8">
      <header className=" z-50 ml-auto mr-auto mt-10 flex h-20 w-full max-w-[1350px] items-center justify-center overflow-hidden rounded-xl bg-purple-kantega-600 text-white">
        <NavigationBar currentPath={pathName} links={links} />
        <NavigationDrawer currentPath={pathName} links={links} className="md:hidden" />
      </header>
    </div>
  );
}
