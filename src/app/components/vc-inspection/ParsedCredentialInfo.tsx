import { InvalidCredentialResult, ValidCredentialResult } from '@inspector/inspector';
import { getSomeValue, StandardRetriever } from '@inspector/calculatedAttributes/types';
import { Standards } from '@inspector/calculatedAttributes/standards';
import LabeledValueCard, { fromJSON, node } from '@/components/data-lists/LabeledValueCard';
import { CircleUser, CircleX, FilePenLine } from 'lucide-react';
import ValidityDates from '@/components/vc-inspection/validity/ValidityDates';
import { Accordion } from '../shadcn/accordion';
import AccordionSection from '../notices/AccordionSection';

type ParsedCredentialInfoProps = JSX.IntrinsicElements['div'] & {
  inspectedResult: InvalidCredentialResult | ValidCredentialResult;
};

/**
 * Component to show everything relevant to a credential that can be parsed.
 * Dates validity, listed data for issuer and subject, errors, proofs, parsed JSON
 */
export default function ParsedCredentialInfo({ inspectedResult, className, ...props }: ParsedCredentialInfoProps) {
  const validSchema = inspectedResult.type === 'ValidCredential';
  const dates = validSchema ? inspectedResult.calculatedAttributes.validityDates : undefined;
  const standard = new StandardRetriever(Standards.W3C_V2);
  const standardDates = dates ? standard.extractOk(dates) : undefined;

  let subjectValues = undefined;
  let issuerValues = undefined;
  if (validSchema) {
    const subject = inspectedResult.parsedJson.credentialSubject;
    subjectValues = fromJSON(subject);
    const issuer = inspectedResult.parsedJson.issuer;
    if (typeof issuer == 'string') {
      issuerValues = [
        {
          label: 'id',
          value: node(issuer),
        },
      ];
    } else {
      issuerValues = fromJSON(issuer);
    }
  }

  return (
    <div className={className} {...props}>
      <div className="grid grid-cols-2 gap-8">
        <LabeledValueCard title="Issuer" titleIcon={FilePenLine} values={issuerValues ?? []} />
        <LabeledValueCard title="Subject" titleIcon={CircleUser} values={subjectValues ?? []} className="row-span-2" />
        {standardDates && (
          <ValidityDates
            withinDates={standardDates.isValid}
            validFrom={getSomeValue(standardDates.validityDates.validFrom)}
            validUntil={getSomeValue(standardDates.validityDates.validUntil)}
          />
        )}
        <Accordion type="multiple" className="flex flex-col gap-4">
          {!validSchema &&
            inspectedResult.error.issues.map((issue, i) => (
              <AccordionSection
                key={i}
                value={issue.path.join('-')}
                className="bg-light-red text-dark-red"
                title={`${issue.path.join(' -> ')}: ${issue.message}`}
                titleIcon={CircleX}
              >
                {issue.message}
              </AccordionSection>
            ))}
        </Accordion>
      </div>
      <Accordion type="single" collapsible className="">
        <AccordionSection value="decoded-to-json" title="Decoded JSON"></AccordionSection>
      </Accordion>
    </div>
  );
}
