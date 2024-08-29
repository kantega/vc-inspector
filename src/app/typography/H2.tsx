import { cn } from '@/lib/utils';

type Props = React.HTMLProps<HTMLHeadingElement>;

export default function H2({ children, className, ...props }: Props) {
  return (
    <h2 {...props} className={cn('leading-extra-tight text-5xl font-bold', className)}>
      {children}
    </h2>
  );
}
