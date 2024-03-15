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

export default function Header() {
  const pathName = usePathname();
  return (
    <header>
      <NavigationBar currentPath={pathName} links={links} className="max-md:hidden" />
      <NavigationDrawer currentPath={pathName} links={links} className="md:hidden" />
    </header>
  );
}
