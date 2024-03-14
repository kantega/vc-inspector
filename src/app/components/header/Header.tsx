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
  return (
    <header>
      <NavigationBar links={links} className="max-md:hidden" />
    </header>
  );
}
