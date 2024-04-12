'use client';
import { AccordionItemProps } from '@radix-ui/react-accordion';
import { AccordionItem, AccordionContent, AccordionTrigger } from '@/components/shadcn/accordion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/styling';
import { ReactNode } from 'react';

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
    <AccordionItem className={cn('rounded-lg p-3 px-4', className)} {...props}>
      <AccordionTrigger>
        <div className={cn('flex items-center', TitleIcon && 'gap-2')}>
          {TitleIcon && <TitleIcon width={30} height={30} />}
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
}
