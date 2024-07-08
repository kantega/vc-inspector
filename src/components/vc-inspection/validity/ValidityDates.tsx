'use client';
import { CircleCheck, CircleX } from 'lucide-react';
import { Accordion } from '@/components/shadcn/accordion';
import { AccordionSingleProps } from '@radix-ui/react-accordion';
import AccordionSection from '@/components/notices/AccordionSection';
import { ReasonedOptional } from '@inspector/calculatedAttributes/types';

type ValidityDatesProps = Omit<AccordionSingleProps, 'type'> & {
  validFrom: ReasonedOptional<Date>;
  validUntil: ReasonedOptional<Date>;
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

  return (
    <Accordion defaultValue="validity-dates" className={className} type="single" collapsible {...props}>
      <AccordionSection
        value="validity-dates"
        title={
          <h3 className="font-bold">{withinDates ? 'Within validity date range' : 'Outside valdity date range'}</h3>
        }
        titleIcon={Icon}
        className={withinDates ? 'bg-light-green text-dark-green' : 'bg-light-red text-dark-red'}
      >
        <div className="flex flex-col gap-3 p-1">
          <>
            <div>
              <p className="text-lg">Valid from</p>
              <p data-testid="valid-from-date" className="text-xl font-semibold">
                {validFrom.kind === 'some' ? formatDate(validFrom.value) : validFrom.reason}
              </p>
            </div>
            <div>
              <p className="text-lg">Expires</p>
              <p data-testid="valid-until-date" className="text-xl font-semibold">
                {validUntil.kind === 'some' ? formatDate(validUntil.value) : validUntil.reason}
              </p>
            </div>
          </>
        </div>
      </AccordionSection>
    </Accordion>
  );
}
