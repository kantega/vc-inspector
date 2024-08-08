'use client';
import { usePathname } from 'next/navigation';
import FeedbackBox from '../notices/FeedbackBox';

/**
 * Component on top of page to select between mobile or desktop navigation
 * Drawer up to tailwinds medium size. Bar above that.
 * Needs to be a client component to be able to get path name
 */
export default function Footer() {
  const pathName = usePathname();
  return (
    <footer className="w-screen bg-background">
      <FeedbackBox />
    </footer>
  );
}
