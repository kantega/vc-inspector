'use client';
import { AccordionItemProps } from '@radix-ui/react-accordion';
import { AccordionItem, AccordionContent, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

type AccordionSectionProps = AccordionItemProps & {};
/**
 * Extended accordion item for simpler styling.
 */
export default function AccordionSection({ title, children, className, ...props }: AccordionSectionProps) {
  return (
    <AccordionItem className={cn('accordion-item rounded-lg p-2 px-4', className)} {...props}>
      <AccordionTrigger className="gap-4">
        <h3 className="text-xl font-bold">{title}</h3>
      </AccordionTrigger>
      <AccordionContent className="text-xl">{children}</AccordionContent>
    </AccordionItem>
  );
}
