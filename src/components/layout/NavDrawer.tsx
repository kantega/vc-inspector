'use client';

import { NavigationLinks } from './Header';
import inspectorLogo from '@/public/inspector-logo.svg';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Links } from '@/utils/links';
import GitHubCat from '@/public/github-mark.svg';
import { cn } from '@/lib/utils';

type NavigationDrawerProps = JSX.IntrinsicElements['div'] & {
  links: NavigationLinks[];
  currentPath: string;
};

/**
 * Navigation bar for mobile screens
 * Opens from the right
 *
 * @param links The name and path the link goes to.
 * @param currentPath The current path for the client
 */
export default function NavigationDrawer({ links, currentPath, className, ...props }: NavigationDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn(className, 'flex w-full justify-between p-3')} {...props}>
      <Link href="/" className="flex gap-2 align-middle">
        <Image src={inspectorLogo} alt="VC Inspector Logo" width={50} />
        <h1 className="text-dark-purple self-center text-xl font-bold">VC Inspector</h1>
      </Link>
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerTrigger asChild>
          <button type="button" aria-label="Open Drawer">
            <Menu width={40} height={40} />
          </button>
        </DrawerTrigger>
        <DrawerContent className="inset-x-auto bottom-0 right-0 h-full w-2/3 flex-row justify-between border-0 bg-background p-5 text-foreground">
          <nav className="flex flex-col gap-6">
            {links.map((l) => (
              <DrawerClose asChild key={l.to}>
                <Link
                  href={l.to}
                  className={`w-min border-white px-1 text-2xl ${l.to === currentPath && 'border-b-2'}`}
                >
                  {l.label}
                </Link>
              </DrawerClose>
            ))}
            <DrawerClose asChild>
              <Link href={Links.GITHUB_LINK} className="mt-auto flex gap-4 text-sm">
                <Image src={GitHubCat} alt="GitHub invertocat link to repository" width={40} height={40} />
                Github repository
              </Link>
            </DrawerClose>
          </nav>
          <DrawerClose className="h-min">
            <X width={40} height={40} />
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
