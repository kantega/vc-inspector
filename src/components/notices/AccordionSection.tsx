'use client';
import { AccordionItemProps } from '@radix-ui/react-accordion';
import { AccordionItem, AccordionContent, AccordionTrigger } from '@/components/shadcn/accordion';
import { LucideIcon } from 'lucide-react';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AccordionSectionProps = Omit<AccordionItemProps, 'title'> & {
  title: ReactNode;
  titleIcon?: LucideIcon;
};
/**
 * Extended accordion item for simpler styling.
 */
export default function AccordionSection({
  title,
  titleIcon: TitleIcon,
  children,
  className,
  ...props
}: AccordionSectionProps) {
  return (
    <AccordionItem className={cn('accordion-item rounded-lg p-2 px-4', className)} {...props}>
      <AccordionTrigger className="gap-4">
        <div className={cn('flex items-center', TitleIcon && 'gap-2')}>
          {TitleIcon && <TitleIcon width={30} height={30} />}
          <h3 className="text-xl">{title}</h3>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-xl">{children}</AccordionContent>
    </AccordionItem>
  );
}
