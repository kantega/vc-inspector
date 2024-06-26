import { cn } from '@/utils/styling';
import { VariantProps, cva } from 'class-variance-authority';
import { Info, CircleAlert, CircleX, CircleCheck, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

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
    <div className={cn(infoBoxVariants({ messageType }), className)} {...props}>
      <div className="flex items-center gap-3">
        <Icon width={20} height={20} />
        <span className="text-md font-semibold">{title}</span>
      </div>
      <div className="py-2">{children}</div>
    </div>
  );
}
