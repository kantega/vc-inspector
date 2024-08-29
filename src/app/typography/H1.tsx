import { cn } from '@/lib/utils';

type Props = React.HTMLProps<HTMLHeadingElement>;

export default function H1({ children, className, ...props }: Props) {
  return (
    <h1 {...props} className={cn(' leading-extra-tight text-6xl font-black', className)}>
      {children}
    </h1>
  );
}
