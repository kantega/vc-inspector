import { CredentialSubject, parseCredentialSubject } from './attributes/credentialSubject';
import { Issuer, parseIssuer } from './attributes/issuer';
import { ParserResult } from './types';
import { Validity, parseValidityDates } from './attributes/validity';

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
