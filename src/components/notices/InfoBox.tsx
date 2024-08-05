import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Info, CircleAlert, CircleX, CircleCheck, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * A box with information to the user
 * Can have several variants to display for different levels
 * of importance and urgency.
 *
 * @param title Title of the box next to the icon.
 * @param messageType Type of color and icon of the box.
 */
export default function InformationBox({ className, title, messageType, children, ...props }: InfoBoxProps) {
  const Icon = icons[messageType ?? 'neutral'];
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-md flex gap-2 font-semibold">
            <Icon width={20} height={20} /> {title}
          </span>
        </TooltipTrigger>
        <TooltipContent
          className={cn(infoBoxVariants({ messageType }), className, 'z-50 max-w-60 bg-background text-foreground')}
        >
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

const messageType = {
  neutral: 'bg-light-blue text-dark-blue',
  warning: 'bg-light-yellow text-dark-yellow',
  error: 'bg-light-red text-dark-red',
  success: 'bg-light-green text-dark-green',
};

export const infoBoxVariants = cva('rounded-2xl p-4 text-sm', {
  variants: {
    messageType: messageType,
  },
  defaultVariants: {
    messageType: 'neutral',
  },
});

type InfoBoxProps = Omit<JSX.IntrinsicElements['div'], 'title'> &
  VariantProps<typeof infoBoxVariants> & {
    title: ReactNode;
  };

const icons: Record<keyof typeof messageType, LucideIcon> = {
  neutral: Info,
  warning: CircleAlert,
  error: CircleX,
  success: CircleCheck,
};
