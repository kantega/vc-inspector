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
    <header className=" z-50 ml-auto mr-auto mt-10 flex h-20 w-4/5 max-w-[1350px] items-center justify-center overflow-hidden rounded-xl bg-purple-kantega-600 text-white">
      <NavigationBar currentPath={pathName} links={links} />
      <NavigationDrawer currentPath={pathName} links={links} className="md:hidden" />
    </header>
  );
}
