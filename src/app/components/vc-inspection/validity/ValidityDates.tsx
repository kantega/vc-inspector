'use client';
import { cn } from '@/utils/styling';
import { CircleCheck, CircleX } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/shadcn/accordion';
import { AccordionSingleProps } from '@radix-ui/react-accordion';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import AccordionSection from '@/components/notices/AccordionSection';

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
      <AccordionSection
        value="validity-dates"
        title={withinDates ? 'Within validity date range' : 'Outside valdity date range'}
        titleIcon={Icon}
        className={withinDates ? 'bg-light-green text-dark-green' : 'bg-light-red text-dark-red'}
      >
        <div className="flex flex-col gap-3 p-1">
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <div>
                <p className="text-xl">Valid from</p>
                <p data-testid="valid-from-date" className="text-2xl font-semibold">
                  {fromDate ?? 'No start of validity'}
                </p>
              </div>
              <div>
                <p className="text-xl">Expires</p>
                <p data-testid="valid-until-date" className="text-2xl font-semibold">
                  {toDate ?? 'No expiration'}
                </p>
              </div>
            </>
          )}
        </div>
      </AccordionSection>
    </Accordion>
  );
}
