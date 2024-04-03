'use client';
import { cn } from '@/utils/styling';
import { CircleCheck, CircleX } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/shadcn/accordion';
import { AccordionSingleProps } from '@radix-ui/react-accordion';

type ValidityDatesProps = Omit<AccordionSingleProps, 'type'> & {
  valid: boolean;
};

export default function ValidityDates({ valid, className, ...props }: ValidityDatesProps) {
  const Icon = valid ? CircleCheck : CircleX;
  const fromDate = new Date();
  const toDate = new Date();
  return (
    <Accordion {...props} className={cn('', className)} type="single" collapsible>
      <AccordionItem
        value="validy-date"
        className={cn('rounded-lg p-2 px-4', valid ? 'bg-light-green text-dark-green' : 'bg-light-red text-dark-red')}
      >
        <AccordionTrigger className="gap-8">
          <div className="flex gap-8">
            <Icon width={25} height={25} />
            <h3 className="text-xl font-bold">
              {valid ? 'Within validity date range' : 'Outside validity date range'}
            </h3>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-5 p-2">
          <div>
            <p className="text-sm">Valid from</p>
            <p className="text-2xl">{fromDate ? fromDate.getDate() : 'No start of validity'}</p>
          </div>
          <div>
            <p className="text-sm">Expires</p>
            <p className="text-2xl">{toDate ? toDate.getDate() : 'No expiration'}</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
