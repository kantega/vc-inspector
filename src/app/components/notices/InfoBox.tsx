import { cn } from '@/utils/styling';
import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';
import infoNeutralIcon from '@/public/infobox/neutral.svg';
import infoWarningIcon from '@/public/infobox/warning.svg';
import infoErrorIcon from '@/public/infobox/error.svg';
import infoSuccessIcon from '@/public/infobox/success.svg';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

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

const icons: Record<keyof typeof messageType, StaticImport> = {
  neutral: infoNeutralIcon,
  warning: infoWarningIcon,
  error: infoErrorIcon,
  success: infoSuccessIcon,
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
  const image = icons[messageType ?? 'neutral'];
  return (
    <div className={cn(infoBoxVariants({ messageType }), className)} {...props}>
      <div className="flex gap-3">
        <Image src={image} alt={`Info box icon`} width={20} height={20} />
        <h4 className="text-md font-bold">{title}</h4>
      </div>
      <div className="py-2">{children}</div>
    </div>
  );
}
