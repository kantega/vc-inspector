import { cn } from '@/utils/styling';
import { VariantProps, cva } from 'class-variance-authority';
import { Info, AlertCircle, XCircle, LucideIcon, CheckCircle } from 'lucide-react';

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

type InfoBoxProps = JSX.IntrinsicElements['div'] &
  VariantProps<typeof infoBoxVariants> & {
    title: string;
  };

const icons: Record<keyof typeof messageType, LucideIcon> = {
  neutral: Info,
  warning: AlertCircle,
  error: XCircle,
  success: CheckCircle,
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
      <div className="flex gap-3">
        <Icon width={20} height={20} />
        <h4 className="text-md font-bold">{title}</h4>
      </div>
      <div className="py-2">{children}</div>
    </div>
  );
}
