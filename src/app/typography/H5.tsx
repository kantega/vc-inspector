import { cn } from '@/lib/utils';

type Props = React.HTMLProps<HTMLHeadingElement>;

export default function H5({ children, className, ...props }: Props) {
  return (
    <h5 {...props} className={cn('text-2xl font-normal leading-tight', className)}>
      {children}
    </h5>
  );
}
