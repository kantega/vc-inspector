'use client';
import { cn } from '@/utils/styling';
import { CircleCheck, CircleX } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/shadcn/accordion';
import { AccordionSingleProps } from '@radix-ui/react-accordion';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

type ValidityDatesProps = Omit<AccordionSingleProps, 'type'> & {
  validFrom?: Date;
  validUntil?: Date;
  withinDates: boolean;
};

/**
 * Change this function to format date to specific needs.
 * Returns format according to the clients locale
 */
function formatDate(datetime?: Date): string | undefined {
  if (!datetime) return;
  const date = datetime.toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric' });
  const time = datetime.toLocaleString('default', { hour: '2-digit', minute: '2-digit' });
  const result = `${time} - ${date}`;
  return result;
}

/**
 * Uses validFrom, validUntil dates with a valid boolean
 * to show if the credential is between dates. Does not presume
 * calculations of the dates given. This to be able to uphold
 * all VC standards for dates.
 */
export default function ValidityDates({ withinDates, validFrom, validUntil, className, ...props }: ValidityDatesProps) {
  const Icon = withinDates ? CircleCheck : CircleX;
  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFromDate(formatDate(validFrom));
    setToDate(formatDate(validUntil));
    setLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Accordion defaultValue="validity-dates" className={className} type="single" collapsible {...props}>
      <AccordionItem
        value="validity-dates"
        className={cn(
          'rounded-lg p-2 px-4',
          withinDates ? 'bg-light-green text-dark-green' : 'bg-light-red text-dark-red',
        )}
      >
        <AccordionTrigger className="gap-8">
          <div className="flex items-center gap-8">
            <Icon width={25} height={25} />
            <h3 className="text-xl font-bold">
              {withinDates ? 'Within validity date range' : 'Outside validity date range'}
            </h3>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-5 p-2">
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <div>
                <p className="text-sm">Valid from</p>
                <p data-testid="valid-from-date" className="text-xl">
                  {fromDate ?? 'No start of validity'}
                </p>
              </div>
              <div>
                <p className="text-sm">Expires</p>
                <p data-testid="valid-until-date" className="text-xl">
                  {toDate ?? 'No expiration'}
                </p>
              </div>
            </>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
