import { getSomeValue, StandardRetriever } from '@inspector/calculatedAttributes/types';
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
import { Claim } from '@inspector/calculatedAttributes/credentialSubject';
import { isPrimitive } from '@inspector/assertTypes';
import { isClaimList } from '../../../inspector/calculatedAttributes/credentialSubject';
import { isZodError } from '../../../inspector/calculatedAttributes/types';

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
    inspectedResult.parsedJson.type === 'CBOR' ? Standards.MDOC : Standards.W3C_V1,
  );

  const dates = standard.getResult(inspectedResult.calculatedAttributes.validityDates);

  const subjectResult = standard.getResult(inspectedResult.calculatedAttributes.credentialSubject);
  const subject = standard.extractOk(inspectedResult.calculatedAttributes.credentialSubject);
  let subjectValues: LabeledValues[] = [];
  if (subject) {
    subjectValues = convertNestedClaims(subject.claims);
    if (subject.id) subjectValues.unshift(labeledValue('id', toNode(subject.id)));
  }

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
        {dates.kind == 'ok' && (
          <ValidityDates
            withinDates={dates.value.isValid}
            validFrom={getSomeValue(dates.value.validityDates.validFrom)}
            validUntil={getSomeValue(dates.value.validityDates.validUntil)}
          />
        )}
        <Accordion
          type="multiple"
          className="flex flex-col gap-4 [&>div]:bg-light-red [&>div]:text-dark-red"
          data-testid="inspection-issues"
        >
          {subjectResult.kind === 'error' && (
            <AccordionSection titleIcon={CircleX} value="subject-error" title={'Credential subject'}>
              {isZodError(subjectResult.error) ? (
                subjectResult.error.issues.map((issue, i) => (
                  <p key={i}>
                    {' '}
                    {issue.path.slice(1).join(' -> ')} {issue.message}{' '}
                  </p>
                ))
              ) : (
                <p>{subjectResult.error.message}</p>
              )}
            </AccordionSection>
          )}
          {dates.kind === 'error' && (
            <AccordionSection titleIcon={CircleX} value="dates-error" title={dates.error.name}>
              {dates.error.message}
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
            <AccordionSection title="Proof" value="proof"></AccordionSection>
          </div>
        </div>
      </Accordion>
    </div>
  );
}
