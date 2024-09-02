import { cn } from '@/lib/utils';

type Props = React.HTMLProps<HTMLHeadingElement>;

export default function H3({ children, className, ...props }: Props) {
  return (
    <h3 {...props} className={cn('leading-extra-tight text-3xl font-bold', className)}>
      {children}
    </h3>
  );
}
