import {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { JSX } from 'react';
import { NavigationLinks } from './Header';
import Link from 'next/link';
import Image from 'next/image';
import kantegaLogo from '@/public/kantega-logo.png';
import inspectorLogo from '@/public/inspector-logo.svg';
import { cn } from '@/lib/utils';

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
      <NavigationMenu className="container max-w-screen-xl justify-between px-10 py-2">
        <Link href="/" className="flex gap-2 align-middle">
          <Image src={inspectorLogo} alt="VC Inspector Logo" width={50} />
          <h1 className="self-center text-xl font-bold">POIROT</h1>
        </Link>
        <NavigationMenuList className="gap-4">
          {links.map((link) => (
            <NavigationMenuLink
              key={link.to}
              className={cn(
                navigationMenuTriggerStyle(),
                'bg-violet-kantega-700 underline decoration-purple-kantega-500 decoration-2 underline-offset-8 ',
              )}
              asChild
            >
              <Link href={link.to}>
                <p className={`border-dark-purple px-1 text-lg ${link.to === currentPath && 'border-b-2'}`}>
                  {link.label}
                </p>
              </Link>
            </NavigationMenuLink>
          ))}
        </NavigationMenuList>
        <Link href="https://www.kantega.no/">
          <p className="text-dark-purple">Crafted by</p>
          <Image src={kantegaLogo} alt="Kantega Logo" width={100} />
        </Link>
      </NavigationMenu>
      <div className="mx-4 h-0 border-t-2 border-dark-gray"></div>
    </div>
  );
}
