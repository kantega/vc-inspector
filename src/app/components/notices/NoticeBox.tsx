import { cn } from '@/app/utils/styling';
import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';

export const noticeBoxVariants = cva('', {
  variants: {
    messageType: {
      info: 'bg-blue-400 text-blue-800',
      warning: 'bg-yellow-400 text-yellow-800',
      error: 'bg-red-400 text-red-800',
      success: 'bg-green-400 text-green-800',
    },
  },
  defaultVariants: {
    messageType: 'info',
  },
});

type NoticeBoxProps = JSX.IntrinsicElements['div'] &
  VariantProps<typeof noticeBoxVariants> & {
    title: string;
  };

/**
 *
 */
export default function NoticeBox({ className, title, messageType, children, ...props }: NoticeBoxProps) {
  return (
    <div className={cn('rounded-2xl p-10', noticeBoxVariants({ messageType }), className)} {...props}>
      <div className="flex gap-10">
        <Image src={''} alt="Notice box" width={30} height={30} />
        <h4>{title}</h4>
      </div>
      <div className="">{children}</div>
    </div>
  );
}
