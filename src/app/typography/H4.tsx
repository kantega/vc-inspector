import { cn } from '@/lib/utils';

type Props = React.HTMLProps<HTMLHeadingElement>;

export default function H4({ children, className, ...props }: Props) {
  return (
    <h4 {...props} className={cn('text-2xl font-bold leading-tight', className)}>
      {children}
    </h4>
  );
}
