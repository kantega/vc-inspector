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

type NavigationBarProps = JSX.IntrinsicElements['div'] & {
  links: NavigationLinks[];
  currentPath: string;
};

/**
 * Navigation bar for larger screens
 *
 * @param links The name and path the link goes to.
 * @param currentPath The current path for the client
 */
export default function NavigationBar({ links, className, currentPath, ...props }: NavigationBarProps) {
  return (
    <div className={cn(className)} {...props}>
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
