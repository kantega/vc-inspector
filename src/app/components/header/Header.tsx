export type NavigationLinks = {
  to: string;
  label: string;
};

const links: NavigationLinks[] = [
  {
    to: '/',
    label: 'Inspector',
  },
];

export default function Header() {
  return <header></header>;
}
