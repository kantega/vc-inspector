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
    <header className="sticky left-0 top-0 z-50 ml-auto mr-auto mt-10 w-4/5 rounded-xl bg-violet-kantega-700 text-white">
      <NavigationBar currentPath={pathName} links={links} className="max-md:hidden" />
      <NavigationDrawer currentPath={pathName} links={links} className="md:hidden" />
    </header>
  );
}
