import { getSomeValue, StandardRetriever } from '@inspector/calculatedAttributes/types';
import { Standards } from '@inspector/calculatedAttributes/standards';
import LabeledValueCard, { fromJSON, labeledValue, node as toNode } from '@/components/data-lists/LabeledValueCard';
import { CircleUser, CircleX, FilePenLine } from 'lucide-react';
import ValidityDates from '@/components/vc-inspection/validity/ValidityDates';
import { Accordion } from '@/components/shadcn/accordion';
import AccordionSection from '@/components/notices/AccordionSection';
import JSONPretty from 'react-json-pretty';
import { SuccessfullParse } from '@inspector/inspector';
import { ReactNode } from 'react';
import UnderConstruction from '../notices/UnderConstruction';

type ParsedCredentialInfoProps = JSX.IntrinsicElements['div'] & {
  inspectedResult: SuccessfullParse;
};

function HLineWithText({ text }: { text: string }) {
  return (
    <div className="relative mx-4 h-0 border-t-2 border-dark-gray p-2">
      <p className="absolute -top-5 left-10 bg-light-purple p-1 text-lg text-readable-gray">{text}</p>
    </div>
  );
}

/**
 * Component to show everything relevant to a credential that can be parsed.
 * Dates validity, listed data for issuer and subject, errors, proofs, parsed JSON
 */
export default function ParsedCredentialInfo({ inspectedResult, className, ...props }: ParsedCredentialInfoProps) {
  // TODO: More dynamic types
  const standard = new StandardRetriever(
    inspectedResult.parsedJson.type === 'CBOR' ? Standards.MDOC : Standards.W3C_V2,
  );

  const dates = standard.extractOk(inspectedResult.calculatedAttributes.validityDates);

  const subject = standard.extractOk(inspectedResult.calculatedAttributes.credentialSubject);
  const subjectValues = subject
    ? subject.claims.map((claim) => {
        // TODO: Current limitation, nested claims will not work
        if (typeof claim.value === 'object') {
          // This fixes Tagged types
          if (claim.value && 'value' in claim.value) {
            return { label: claim.key, value: toNode(claim.value.value as ReactNode) };
          }
          console.log(claim.value);
          return { label: claim.key, value: toNode('Nested value (current limitation, will be fixed asap)') };
        }
        return { label: claim.key, value: toNode(claim.value as ReactNode) };
      })
    : [];

  const issuer = standard.extractOk(inspectedResult.calculatedAttributes.issuer);
  const issuerValues = fromJSON(issuer);

  return (
    <div className={className} {...props}>
      <div className="grid grid-cols-2 gap-8">
        <LabeledValueCard
          title="Issuer"
          titleIcon={FilePenLine}
          values={issuerValues ?? []}
          data-testid="issuer-card"
        />
        <LabeledValueCard
          title="Subject"
          titleIcon={CircleUser}
          values={subjectValues ?? []}
          className="row-span-2"
          data-testid="subject-card"
        />
        {dates && (
          <ValidityDates
            withinDates={dates.isValid}
            validFrom={getSomeValue(dates.validityDates.validFrom)}
            validUntil={getSomeValue(dates.validityDates.validUntil)}
          />
        )}
        <Accordion type="multiple" className="flex flex-col gap-4" data-testid="inspection-issues"></Accordion>
      </div>

      <Accordion type="single" collapsible className="mt-5 flex flex-col gap-8 [&_.accordion-item]:bg-white">
        {!(inspectedResult.parsedJson.type === 'JSON') && ( // TODO: Use .format
          <div>
            <HLineWithText text="Raw JSON" />
            <AccordionSection value="decoded-to-json" title="Decoded JSON">
              <JSONPretty
                className="break-words"
                stringStyle="color:#f92672;"
                booleanStyle="color:#f92672;"
                valueStyle="color:#f92672;"
                data={inspectedResult.parsedJson}
              />
            </AccordionSection>
          </div>
        )}
        <div>
          <HLineWithText text="Credential" />
          <div className="flex flex-col gap-4">
            <AccordionSection title="Proof" value="proof">
              <UnderConstruction />
            </AccordionSection>
          </div>
        </div>
      </Accordion>
    </div>
  );
}
