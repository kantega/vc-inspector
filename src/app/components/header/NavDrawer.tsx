'use client';
import { cn } from '@/utils/styling';
import { NavigationLinks } from './Header';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/shadcn/drawer';
import { useState } from 'react';
import menuIcon from '@/public/hamburger.svg';
import Image from 'next/image';

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
  const [open, setOpen] = useState(true);

  return (
    <div className={cn(className)} {...props}>
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerTrigger asChild>
          <button>
            <Image src={menuIcon} alt="Menu" width={20} height={20} />
          </button>
        </DrawerTrigger>
        <DrawerContent className="inset-x-auto bottom-0 right-0 h-full w-2/3">
          <DrawerHeader className="text-left">
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>Make changes to your profile here. Click save when you are done.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
