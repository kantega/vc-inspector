import { Standards } from '@inspector/calculatedAttributes/standards';
import LabeledValueCard, {
  fromJSON,
  labeledValue,
  LabeledValues,
  nested as toNested,
  node as toNode,
} from '@/components/data-lists/LabeledValueCard';
import { CircleUser, FilePenLine, Unlock } from 'lucide-react';
import ValidityDates from '@/components/vc-inspection/validity/ValidityDates';
import { SuccessfullParse } from '@inspector/inspector';
import React, { useState } from 'react';
import { StandardRetriever } from '@inspector/calculatedAttributes/standardRetriever';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Claim } from '@inspector/calculatedAttributes/attributes/credentialSubject';
import { isPrimitive } from '@inspector/assertTypes';
import { isClaimList } from '@inspector/calculatedAttributes/attributes/credentialSubject';
import ZodIssueFormatter from '@/components/vc-inspection/ZodIssueFormatter';
import InformationBox from '@/components/notices/InfoBox';

type ParsedCredentialInfoProps = JSX.IntrinsicElements['div'] & {
  inspectedResult: SuccessfullParse | null | undefined;
};

type InnerParsedCredentialInfoProps = JSX.IntrinsicElements['div'] & {
  inspectedResult: SuccessfullParse;
};

type ParsedSubjectJson = {
  credentialSubject: Result<CredentialSubject>;
};

type ParsedIssuerJson = {
  issuer: Result<Issuer>;
};

/**
 * Component to show everything relevant to a credential that can be parsed.
 * Dates validity, listed data for issuer and subject, errors, proofs, parsed JSON
 */
export default function ParsedCredentialInfo({ inspectedResult, ...props }: ParsedCredentialInfoProps) {
  if (!inspectedResult) return null;
  return <InnerParsedCredentialInfo inspectedResult={inspectedResult} {...props} />;
}

function InnerParsedCredentialInfo({ inspectedResult, className, ...props }: InnerParsedCredentialInfoProps) {
  // TODO: More dynamic types
  const [showFullJson, setShowFullJson] = useState(false);
  const [selectedStandard, setSelectedStandard] = useState(
    inspectedResult.parsedJson.type === 'CBOR' ? Standards.MDOC : Standards.W3C_V2,
  );

  const standard = new StandardRetriever(selectedStandard);

  // const datesJson = inspectedResult.calculatedAttributes.validityDates[selectedStandard];
  const dates = standard.getResult(inspectedResult.calculatedAttributes.validityDates);

  const subjectJson = (inspectedResult.parsedJson.payload as unknown as ParsedSubjectJson)['credentialSubject'];
  const subject = standard.getResult(inspectedResult.calculatedAttributes.credentialSubject);
  let subjectValues: LabeledValues[] = [];
  if (subject.kind === 'ok') {
    subjectValues = convertNestedClaims(subject.value.claims);
    if (subject.value.id) subjectValues.unshift(labeledValue('id', toNode(subject.value.id)));
  }

  const issuerJson = (inspectedResult.parsedJson.payload as unknown as ParsedIssuerJson)['issuer'];
  const issuer = standard.getResult(inspectedResult.calculatedAttributes.issuer);
  let issuerValues: LabeledValues[] = [];
  if (issuer.kind === 'ok') {
    issuerValues = fromJSON(issuer.value.attributes); // Inspector needs to support more attributes
    issuerValues.unshift(labeledValue('id', toNode(issuer.value.id)));
  }

  return (
    <div className={className} {...props}>
      <div>
        <h1 className="mt-2 flex items-center gap-2 text-2xl font-bold">
          <Unlock />
          Decoded
        </h1>
      </div>
      <div className="flex items-center justify-between">
        <FullJsonSwitch isOn={showFullJson} setIsOn={setShowFullJson} />
        <div className="flex flex-col gap-2">
          <Select
            onValueChange={(s: string) => setSelectedStandard(stringToStandard[s])}
            defaultValue={Object.entries(stringToStandard)
              .find(([_key, standard]) => standard === selectedStandard)
              ?.at(0)}
          >
            <SelectTrigger
              data-testid="standard-selector"
              className="h-12 w-44 min-w-max border border-slate-300 bg-slate-50"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="w3c2">W3C 2.0</SelectItem>
              <SelectItem data-testid="w3c1-option" value="w3c1">
                W3C 1.1
              </SelectItem>
              <SelectItem value="mdoc">MDOC</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ShowComponents show={!showFullJson}>
        {issuer.kind === 'ok' ? (
          <LabeledValueCard
            title="Issuer"
            titleIcon={FilePenLine}
            values={issuerValues}
            data-testid="issuer-card"
            jsonData={issuerJson}
          />
        ) : (
          <ErrorBox title="Issuer" error={issuer.error} />
        )}
        {subject.kind === 'ok' ? (
          <LabeledValueCard
            title="Subject"
            color="hsla(350, 89%, 60%, 1)"
            secondaryColor="hsla(350, 89%, 60%, 0.2)"
            titleIcon={CircleUser}
            values={subjectValues}
            className="row-span-2"
            data-testid="subject-card"
            jsonData={subjectJson}
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
      </ShowComponents>

      <ShowComponents show={showFullJson}>
        <LabeledValueCard
          title="Decoded JSON"
          color="hsla(25, 95%, 53%, 1)"
          secondaryColor="hsla(25, 95%, 53%, 0.2)"
          values={subjectValues}
          className="row-span-2"
          data-testid="subject-card"
          showJson={true}
          switchEnabled={false}
          jsonData={inspectedResult.parsedJson}
        />
      </ShowComponents>
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

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import FullJsonSwitch from './animateToggle';
import { Issuer } from '@/inspector/calculatedAttributes/attributes/issuer';
import { Result } from '@/inspector/calculatedAttributes/results';
import { CredentialSubject } from '@/inspector/calculatedAttributes/attributes/credentialSubject';

export function JsonSwitch({
  showFullJson,
  setShowFullJson,
}: {
  showFullJson: boolean;
  setShowFullJson: (show: boolean) => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="full-json-switch"
        type="button"
        value={showFullJson.toString()}
        checked={showFullJson}
        onClick={(e) => {
          const value = e.currentTarget.value === 'false' ? true : false;
          setShowFullJson(value);
        }}
      />
      <Label htmlFor="full-json-switch">Show complete JSON</Label>
    </div>
  );
}

function ShowComponents({ show, children }: { show: boolean; children: React.ReactNode }) {
  if (!show) return null;
  return <>{children}</>;
}
