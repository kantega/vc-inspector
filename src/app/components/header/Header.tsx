'use client';
import { usePathname } from 'next/navigation';
import NavigationBar from './NavBar';

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
  const pathname = usePathname();
  return (
    <header>
      <NavigationBar currentPath={pathname} links={links} className="max-md:hidden" />
    </header>
  );
}
