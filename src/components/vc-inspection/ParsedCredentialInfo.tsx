import { Standards } from '@inspector/calculatedAttributes/standards';
import LabeledValueCard, {
  fromJSON,
  labeledValue,
  LabeledValues,
  nested as toNested,
  node as toNode,
} from '@/components/data-lists/LabeledValueCard';
import { CircleUser, FilePenLine } from 'lucide-react';
import ValidityDates from '@/components/vc-inspection/validity/ValidityDates';
import { Accordion } from '@/components/ui/accordion';
import AccordionSection from '@/components/notices/AccordionSection';
import JSONPretty from 'react-json-pretty';
import { SuccessfullParse } from '@inspector/inspector';
import { useState } from 'react';
import { StandardRetriever } from '@inspector/calculatedAttributes/standardRetriever';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Claim } from '@inspector/calculatedAttributes/attributes/credentialSubject';
import { isPrimitive } from '@inspector/assertTypes';
import { isClaimList } from '@inspector/calculatedAttributes/attributes/credentialSubject';
import ZodIssueFormatter from '@/components/vc-inspection/ZodIssueFormatter';
import UnderConstruction from '@/components/notices/UnderConstruction';
import InformationBox from '@/components/notices/InfoBox';

type ParsedCredentialInfoProps = JSX.IntrinsicElements['div'] & {
  inspectedResult: SuccessfullParse | null | undefined;
};

type InnerParsedCredentialInfoProps = JSX.IntrinsicElements['div'] & {
  inspectedResult: SuccessfullParse;
};

function HLineWithText({ text }: { text: string }) {
  return (
    <div className="border-dark-gray relative mx-4 h-0 border-t-2 p-2">
      <p className="bg-light-purple text-readable-gray absolute -top-5 left-10 p-1 text-lg">{text}</p>
    </div>
  );
}

const stringToStandard: Record<string, Standards> = {
  w3c2: Standards.W3C_V2,
  w3c1: Standards.W3C_V1,
  mdoc: Standards.MDOC,
  sdjwt: Standards.SD_JWT,
};

/**
 * Converts a list of credential subject claims to a
 * labaled values list. Both structures can be nested.
 * If a claim in claims is a list of claims, it is converted to a nested
 * labaled value. An unhandled claim is prefixed with `Unknown value`
 * followed by the stringified version of it.
 */
export function convertNestedClaims(claims: Claim[]): LabeledValues[] {
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
    return labeledValue(c.key, toNode(`Unknown value '${JSON.stringify(c.value)}'`));
  });
}

/**
 * Simple box for show errors the same way.
 */
function ErrorBox({ title, error }: { title: string; error: Error }) {
  return (
    <InformationBox
      data-testid={title}
      title={<span className="text-xl">{title}</span>}
      className="[&>*]:text-lg"
      messageType="error"
    >
      <ZodIssueFormatter error={error} />
    </InformationBox>
  );
}

/**
 * Component to show everything relevant to a credential that can be parsed.
 * Dates validity, listed data for issuer and subject, errors, proofs, parsed JSON
 */
export default function ParsedCredentialInfo({ inspectedResult, className, ...props }: ParsedCredentialInfoProps) {
  if (!inspectedResult) return null;
  return <InnerParsedCredentialInfo inspectedResult={inspectedResult} className={className} {...props} />;
}

function InnerParsedCredentialInfo({ inspectedResult, className, ...props }: InnerParsedCredentialInfoProps) {
  // TODO: More dynamic types
  const [selectedStandard, setSelectedStandard] = useState(
    inspectedResult.parsedJson.type === 'CBOR' ? Standards.MDOC : Standards.W3C_V2,
  );

  const standard = new StandardRetriever(selectedStandard);

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
      <Select
        onValueChange={(s: string) => setSelectedStandard(stringToStandard[s])}
        defaultValue={Object.entries(stringToStandard)
          .find(([_key, standard]) => standard === selectedStandard)
          ?.at(0)}
      >
        <SelectTrigger data-testid="standard-selector" className="w-32 min-w-max">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="w3c2">W3C 2.0</SelectItem>
          <SelectItem data-testid="w3c1-option" value="w3c1">
            W3C 1.1
          </SelectItem>
          <SelectItem value="mdoc">MDOC</SelectItem>
        </SelectContent>
      </Select>
      {issuer.kind === 'ok' ? (
        <LabeledValueCard title="Issuer" titleIcon={FilePenLine} values={issuerValues} data-testid="issuer-card" />
      ) : (
        <ErrorBox title="Issuer" error={issuer.error} />
      )}

      {subject.kind === 'ok' ? (
        <LabeledValueCard
          title="Subject"
          titleIcon={CircleUser}
          values={subjectValues}
          className="row-span-2"
          data-testid="subject-card"
        />
      ) : (
        <ErrorBox title="Credential subject" error={subject.error} />
      )}
      {dates.kind == 'ok' ? (
        <ValidityDates
          className="w-full"
          withinDates={dates.value.isValid}
          validFrom={dates.value.validityDates.validFrom}
          validUntil={dates.value.validityDates.validUntil}
        />
      ) : (
        <ErrorBox title="Dates of validity" error={dates.error} />
      )}

      <Accordion type="multiple" className="mt-5 flex flex-col gap-8 [&_.accordion-item]:bg-white">
        {inspectedResult.parsedJson.type !== 'JSON' && ( // TODO: Use .format
          <>
            <HLineWithText text="Raw JSON" />
            <AccordionSection value="decoded-to-json" title="Decoded JSON" className="px-0">
              <JSONPretty
                className="break-words"
                stringStyle="color:#f92672;"
                booleanStyle="color:#f92672;"
                valueStyle="color:#f92672;"
                data={inspectedResult.parsedJson}
              />
            </AccordionSection>
          </>
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
