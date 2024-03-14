import {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/shadcn/navigation-menu';
import { JSX } from 'react';
import { NavigationLinks } from './Header';
import Link from 'next/link';

type NavigationBarProps = JSX.IntrinsicElements['nav'] & {
  links: NavigationLinks[];
};

export default function NavigationBar({ links, className }: NavigationBarProps) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {links.map((l) => (
          <Link href={l.to} key={l.to}>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>{l.label}</NavigationMenuLink>
          </Link>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
