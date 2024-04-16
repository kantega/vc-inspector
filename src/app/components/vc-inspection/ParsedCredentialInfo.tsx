import { InvalidCredentialResult, ValidCredentialResult } from '@inspector/inspector';
import { getSomeValue, StandardRetriever } from '@inspector/calculatedAttributes/types';
import { Standards } from '@inspector/calculatedAttributes/standards';
import LabeledValueCard, { fromJSON, labeledValue, node } from '@/components/data-lists/LabeledValueCard';
import { CircleUser, CircleX, FilePenLine } from 'lucide-react';
import ValidityDates from '@/components/vc-inspection/validity/ValidityDates';
import { Accordion } from '@/components/shadcn/accordion';
import AccordionSection from '@/components/notices/AccordionSection';
import { isStrRecord } from '@/utils/assertTypes';
import JSONPretty from 'react-json-pretty';

type ParsedCredentialInfoProps = JSX.IntrinsicElements['div'] & {
  inspectedResult: InvalidCredentialResult | ValidCredentialResult;
};

function HLineWithText({ text }: { text: string }) {
  return (
    <div className="relative mx-4 h-0 border-t-2 border-dark-gray p-2">
      <p className="absolute -top-5 left-10 bg-light-purple p-1 text-xl text-readable-gray">{text}</p>
    </div>
  );
}

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
      issuerValues = [labeledValue('id', node(issuer))];
    } else if (issuer) {
      issuerValues = fromJSON(issuer);
    }
  } else {
    const json = inspectedResult.parsedJson.payload;
    if (isStrRecord(json)) {
      if ('credentialSubject' in json && isStrRecord(json.credentialSubject)) {
        subjectValues = fromJSON(json.credentialSubject);
      }
      if ('issuer' in json) {
        if (isStrRecord(json.issuer)) {
          issuerValues = fromJSON(json.issuer);
        } else if (typeof json.issuer === 'string') {
          issuerValues = [labeledValue('id', node(json.issuer))];
        }
      }
    }
  }

  let context = undefined;
  if (validSchema) {
    context = inspectedResult.parsedJson['@context'];
  } else {
    const payload = inspectedResult.parsedJson.payload;
    if (
      isStrRecord(payload) &&
      '@context' in payload &&
      Array.isArray(payload['@context']) &&
      payload['@context'].length > 0 &&
      typeof payload['@context'][0] == 'string'
    ) {
      context = payload['@context'];
    }
  }

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
        {standardDates && (
          <ValidityDates
            withinDates={standardDates.isValid}
            validFrom={getSomeValue(standardDates.validityDates.validFrom)}
            validUntil={getSomeValue(standardDates.validityDates.validUntil)}
          />
        )}
        <Accordion type="multiple" className="flex flex-col gap-4" data-testid="inspection-issues">
          {!validSchema &&
            inspectedResult.error.issues.map((issue, i) => (
              <AccordionSection
                key={i}
                value={issue.path.join('-') + i}
                className="bg-light-red text-dark-red"
                title={issue.path.join(' -> ')}
                titleIcon={CircleX}
              >
                {issue.message}
              </AccordionSection>
            ))}
        </Accordion>
      </div>

      <Accordion type="single" collapsible className="mt-5 flex flex-col gap-8 [&_.accordion-item]:bg-white">
        {inspectedResult.parsedJson.type === 'JWT' && ( // TODO: Use .format
          <div>
            <HLineWithText text="JWT" />
            <AccordionSection value="decoded-to-json" title="Decoded JSON">
              <JSONPretty
                className="break-words text-lg"
                stringStyle="color:#f92672;"
                booleanStyle="color:#f92672;"
                valueStyle="color:#f92672;"
                data={validSchema ? inspectedResult.parsedJson : inspectedResult.parsedJson.payload}
              />
            </AccordionSection>
          </div>
        )}
        <div>
          <HLineWithText text="Credential" />
          <div className="flex flex-col gap-4">
            <AccordionSection title="Proof" value="proof"></AccordionSection>
            {context && (
              <AccordionSection title="Context" value="context">
                <div className="text-xl">
                  {context.map((el) => (
                    <p key={el}>{el}</p>
                  ))}
                </div>
              </AccordionSection>
            )}
          </div>
        </div>
      </Accordion>
    </div>
  );
}
