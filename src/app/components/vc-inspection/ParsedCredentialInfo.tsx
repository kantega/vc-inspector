import { InvalidCredentialResult, ValidCredentialResult } from '@inspector/inspector';
import { getSomeValue, StandardRetriever } from '@inspector/calculatedAttributes/types';
import { Standards } from '@inspector/calculatedAttributes/standards';
import LabeledValueCard, { fromJSON, node } from '@/components/data-lists/LabeledValueCard';
import { CircleUser, FilePenLine } from 'lucide-react';
import ValidityDates from '@/components/vc-inspection/validity/ValidityDates';

type ParsedCredentialInfoProps = JSX.IntrinsicElements['div'] & {
  inspectedResult: InvalidCredentialResult | ValidCredentialResult;
};

/**
 * Component to show everything relevant to a credential that can be parsed.
 * Dates validity, listed data for issuer and subject, errors, proofs, parsed JSON
 */
export default function ParsedCredentialInfo({ inspectedResult, className, ...props }: ParsedCredentialInfoProps) {
  const valid = inspectedResult.type === 'ValidCredential';
  const dates = valid ? inspectedResult.calculatedAttributes.validityDates : undefined;
  const standard = new StandardRetriever(Standards.W3C_V2);
  const standardDates = dates ? standard.extractOk(dates) : undefined;

  let subjectValues = undefined;
  let issuerValues = undefined;
  if (valid) {
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
        <LabeledValueCard title="Subject" titleIcon={CircleUser} values={subjectValues ?? []} className='row-span-2' />
        {standardDates && (
          <ValidityDates
            withinDates={standardDates.isValid}
            validFrom={getSomeValue(standardDates.validityDates.validFrom)}
            validUntil={getSomeValue(standardDates.validityDates.validUntil)}
          />
        )}
      </div>
    </div>
  );
}
