import { CredentialSubject, parseCredentialSubject } from './credentialSubject';
import { Issuer, parseIssuer } from './issuer';
import { ParserResult } from './types';
import { Validity, parseValidityDates } from './validity';

export type CalculatedAttributes = {
  validityDates: ParserResult<Validity>;
  credentialSubject: ParserResult<CredentialSubject>;
  issuer: ParserResult<Issuer>;
};

export function calculateAttributes(parsedJson: unknown): CalculatedAttributes {
  return {
    validityDates: parseValidityDates(parsedJson),
    credentialSubject: parseCredentialSubject(parsedJson),
    issuer: parseIssuer(parsedJson),
  };
}
