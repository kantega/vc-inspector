import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { JSX } from 'react';
import { NavigationLinks } from './Header';
import Link from 'next/link';
import Image from 'next/image';
import kantegaLogo from '@/public/kantega-logo.png';
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
    <nav className="flex h-full w-full items-center justify-between p-0 max-md:hidden">
      <Link href="/" className="flex gap-2 px-10 align-middle">
        <h1 className="self-center text-xl font-bold">POIROT</h1>
      </Link>
      <div className="flex items-center justify-center gap-4">
        {links.map((link) => (
          <Link key={link.to} className={cn(navigationMenuTriggerStyle(), 'bg-purple-kantega-600')} href={''}>
            <Link href={link.to}>
              <p
                className={`border-dark-purple px-1 text-lg ${link.to === currentPath && 'decoration-purple-kantega-200 underline decoration-2 underline-offset-8'}`}
              >
                {link.label}
              </p>
            </Link>
          </Link>
        ))}
      </div>
      <Link href="https://www.kantega.no/" className="bg-purple-kantega-400 relative flex h-full items-center px-12">
        <div className="border-b-purple-kantega-400 absolute -bottom-1 -left-10 border-b-[100px] border-l-[50px] border-l-purple-kantega-600"></div>
        <Image src={kantegaLogo} alt="Kantega Logo" width={100} />
      </Link>
    </nav>
  );
}
