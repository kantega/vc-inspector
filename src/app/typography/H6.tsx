import { cn } from '@/lib/utils';

type Props = React.HTMLProps<HTMLHeadingElement>;

export default function H6({ children, className, ...props }: Props) {
  return (
    <h6 {...props} className={cn('text-lg font-bold leading-tight', className)}>
      {children}
    </h6>
  );
}
