'use client';
import { cn } from '@/utils/styling';
import { NavigationLinks } from './Header';
import inspectorLogo from '@/public/inspector-logo.svg';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/shadcn/drawer';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Links } from '@/utils/links';
import GitHubCat from '@/public/github-mark-white.svg';

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
        <Image src={inspectorLogo} alt="VC Inspector Logo" width={50} height={20} />
        <h1 className="self-center text-xl font-bold text-dark-purple">VC Inspector</h1>
      </Link>
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerTrigger asChild>
          <button type="button" aria-label="Open Drawer">
            <Menu width={40} height={40} />
          </button>
        </DrawerTrigger>
        <DrawerContent className="inset-x-auto bottom-0 right-0 h-full w-2/3 flex-row justify-between border-0 bg-dark-purple p-5">
          <nav className="flex flex-col gap-6">
            {links.map((l) => (
              <DrawerClose asChild key={l.to}>
                <Link
                  href={l.to}
                  className={`w-min border-white px-1 text-2xl text-white ${l.to === currentPath && 'border-b-2'}`}
                >
                  {l.label}
                </Link>
              </DrawerClose>
            ))}
            <DrawerClose asChild>
              <Link href={Links.GITHUB_LINK}>
                <Image src={GitHubCat} alt="GitHub invertocat link to repository" width={40} height={40} />
              </Link>
            </DrawerClose>
          </nav>
          <DrawerClose className="h-min">
            <X width={40} height={40} color="white" />
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
