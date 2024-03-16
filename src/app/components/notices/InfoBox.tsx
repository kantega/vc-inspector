import { cn } from '@/utils/styling';
import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';
import infoNeutralIcon from '@/public/info-neutral.svg';

export const infoBoxVariants = cva('rounded-2xl p-4 text-sm', {
  variants: {
    messageType: {
      neutral: 'bg-[#CCD5FF] text-[#00199A]',
      warning: 'bg-yellow-400 text-yellow-800',
      error: 'bg-red-400 text-red-800',
      success: 'bg-green-400 text-green-800',
    },
  },
  defaultVariants: {
    messageType: 'neutral',
  },
});

type InfoBoxProps = JSX.IntrinsicElements['div'] &
  VariantProps<typeof infoBoxVariants> & {
    title: string;
  };

/**
 * A box with information to the user
 * Can have several variants to display for different levels
 * of importance and urgency.
 *
 * @param title Title of the box next to the icon.
 * @param messageType Type of color and icon of the box.
 */
export default function InformationBox({
  className,
  title,
  messageType = 'neutral',
  children,
  ...props
}: InfoBoxProps) {
  return (
    <div className={cn(infoBoxVariants({ messageType }), className)} {...props}>
      <div className="flex gap-3">
        <Image src={infoNeutralIcon} alt={`Info box icon`} width={20} height={20} />
        <h4 className="text-md font-bold">{title}</h4>
      </div>
      <div className="py-2">{children}</div>
    </div>
  );
}
