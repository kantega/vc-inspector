'use client';
import { usePathname } from 'next/navigation';
import NavigationBar from './NavBar';
import NavigationDrawer from './NavDrawer';

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
  const pathName = usePathname();
  return (
    <header>
      <NavigationBar currentPath={pathName} links={links} className="max-md:hidden" />
      <NavigationDrawer currentPath={pathName} links={links} className="md:hidden" />
    </header>
  );
}
