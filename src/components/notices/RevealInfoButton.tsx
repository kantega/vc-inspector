'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { EyeOff } from 'lucide-react';
import { ComponentPropsWithRef, ReactNode, useState } from 'react';

type RevealInfoButtonProps = ComponentPropsWithRef<typeof Button> & {
  label: ReactNode;
  showHideButton?: boolean;
};
/**
 * Button that shows content after it is clicked
 */
export default function RevealInfoButton({
  label,
  showHideButton,
  children,
  className,
  ...props
}: RevealInfoButtonProps) {
  const [clicked, setClicked] = useState(false);
  return clicked ? (
    <div className="flex items-center">
      {showHideButton && (
        <Button variant="ghost" aria-label="show or hide" className="" onClick={() => setClicked(false)}>
          <EyeOff />
        </Button>
      )}
      {children}
    </div>
  ) : (
    <Button variant="outline" onClick={() => setClicked(true)} className={cn('bg-light-gray', className)} {...props}>
      {label}
    </Button>
  );
}
