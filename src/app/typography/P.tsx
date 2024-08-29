import { cva } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/lib/utils';

type Props = React.HTMLProps<HTMLParagraphElement> & {
  variant?: keyof typeof variant;
};

export default function P({ variant, children, className, ...props }: Props) {
  return (
    <p {...props} className={cn('leading- text-xs', paragraphVariants({ variant }), className)}>
      {children}
    </p>
  );
}

const variant = {
  'body-bold': 'text-lg leading-normal font-bold',
  body: 'text-lg leading-normal font-normal',
  'small-bold': 'text-base leading-normal font-bold',
  'small-body': 'text-base leading-normal font-normal',
  'xs-bold': 'text-sm leading-normal font-bold',
  'xs-body': 'text-sm leading-normal font-noraml',
  'xxs-bold': 'text-xs leading-snug font-bold',
  'xxs-body': 'text-xs leading-snug font-normal',
  none: '',
};

const paragraphVariants = cva('', {
  variants: {
    variant,
  },
  defaultVariants: {
    // todo: add default variant
    variant: 'none',
  },
});
