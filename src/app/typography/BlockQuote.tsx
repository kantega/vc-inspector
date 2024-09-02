import { cn } from '@/lib/utils';

type Props = React.HTMLProps<HTMLQuoteElement>;

export default function BlockQuote({ children, className, ...props }: Props) {
  return (
    <blockquote {...props} className={cn('mt-6 border-l-2 pl-6 italic', className)}>
      {children}
    </blockquote>
  );
}
