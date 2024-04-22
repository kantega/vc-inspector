import { Standards } from '@inspector/calculatedAttributes/standards';
import LabeledValueCard, {
  fromJSON,
  labeledValue,
  LabeledValues,
  nested as toNested,
  node as toNode,
} from '@/components/data-lists/LabeledValueCard';
import { CircleUser, CircleX, FilePenLine } from 'lucide-react';
import ValidityDates from '@/components/vc-inspection/validity/ValidityDates';
import { Accordion } from '@/components/shadcn/accordion';
import AccordionSection from '@/components/notices/AccordionSection';
import JSONPretty from 'react-json-pretty';
import { SuccessfullParse } from '@inspector/inspector';
import { Claim } from '@inspector/calculatedAttributes/attributes/credentialSubject';
import { isPrimitive } from '@inspector/assertTypes';
import { isClaimList } from '@inspector/calculatedAttributes/attributes/credentialSubject';
import ZodIssueFormatter from '@/components/vc-inspection/ZodIssueFormatter';
import UnderConstruction from '@/components/notices/UnderConstruction';
import { StandardRetriever } from '@inspector/calculatedAttributes/standardRetriever';

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

function convertNestedClaims(claims: Claim[]): LabeledValues[] {
  return claims.map((c) => {
    let toPush = undefined;
    if (isClaimList(c.value)) {
      toPush = toNested(convertNestedClaims(c.value));
    } else if (isPrimitive(c.value)) {
      toPush = toNode(c.value);
    }
    if (toPush) {
      return labeledValue(c.key, toPush);
    }
    return labeledValue(c.key, toNode(`Unknown value '${c.value}'`));
  });
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

  const dates = standard.getResult(inspectedResult.calculatedAttributes.validityDates);

  const subject = standard.getResult(inspectedResult.calculatedAttributes.credentialSubject);
  let subjectValues: LabeledValues[] = [];
  if (subject.kind === 'ok') {
    subjectValues = convertNestedClaims(subject.value.claims);
    if (subject.value.id) subjectValues.unshift(labeledValue('id', toNode(subject.value.id)));
  }

  const issuer = standard.getResult(inspectedResult.calculatedAttributes.issuer);
  let issuerValues: LabeledValues[] = [];
  if (issuer.kind === 'ok') {
    issuerValues = fromJSON(issuer.value.attributes); // Inspector needs to support more attributes
    issuerValues.unshift(labeledValue('id', toNode(issuer.value.id)));
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
        {dates.kind == 'ok' && (
          <ValidityDates
            withinDates={dates.value.isValid}
            validFrom={dates.value.validityDates.validFrom}
            validUntil={dates.value.validityDates.validUntil}
          />
        )}
        <Accordion
          type="multiple"
          className="flex flex-col gap-4 [&>div]:w-full [&>div]:bg-light-red [&>div]:text-dark-red"
          data-testid="inspection-issues"
        >
          {issuer.kind === 'error' && (
            <AccordionSection titleIcon={CircleX} value="issuer-error" title={'Issuer'}>
              <ZodIssueFormatter error={issuer.error} />
            </AccordionSection>
          )}
          {subject.kind === 'error' && (
            <AccordionSection titleIcon={CircleX} value="subject-error" title={'Credential subject'}>
              <ZodIssueFormatter error={subject.error} />
            </AccordionSection>
          )}
          {dates.kind === 'error' && (
            <AccordionSection titleIcon={CircleX} value="dates-error" title={'Dates of validity'}>
              <ZodIssueFormatter error={dates.error} />
            </AccordionSection>
          )}
        </Accordion>
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
