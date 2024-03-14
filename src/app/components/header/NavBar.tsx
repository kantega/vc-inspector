import {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/shadcn/navigation-menu';
import { JSX } from 'react';
import { NavigationLinks } from './Header';
import Link from 'next/link';
import { cn } from '@/utils/styling';
import Image from 'next/image';
import kantegaLogo from '@/public/kantega-logo.png';
import inspectorLogo from '@/public/inspector-logo.svg';

type NavigationBarProps = JSX.IntrinsicElements['nav'] & {
  links: NavigationLinks[];
  currentPath: string;
};

export default function NavigationBar({ links, className, currentPath }: NavigationBarProps) {
  return (
    <div className={cn(className)}>
      <NavigationMenu className="max-w-full justify-between py-2 pl-10 pr-10">
        <Link href="/" className="flex gap-2 align-middle text-xl font-bold text-dark-purple">
          <Image src={inspectorLogo} alt="VC Inspector Logo" width={50} height={20} />
          <h1 className="h-min self-center">VC Inspector</h1>
        </Link>
        <NavigationMenuList>
          {links.map((l) => (
            <NavigationMenuLink
              key={l.to}
              className={cn(navigationMenuTriggerStyle(), 'block text-readable-gray')}
              asChild
            >
              <Link href={l.to}>
                <p>{l.label}</p>
                {l.to === currentPath && <div className="-mx-2 my-1 rounded border-t-2 border-dark-purple"></div>}
              </Link>
            </NavigationMenuLink>
          ))}
        </NavigationMenuList>
        <Link href="https://www.kantega.no/">
          <p className="text-dark-purple">Created by:</p>
          <Image src={kantegaLogo} alt="Kantega Logo" width={100} height={100} />
        </Link>
      </NavigationMenu>
      <div className="mx-4 h-0 border-t-2 border-subtle-gray"></div>
    </div>
  );
}
