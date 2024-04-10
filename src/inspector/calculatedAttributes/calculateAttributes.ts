import { VC } from '../credentialSchemas/verifiableCredential';
import { ParserResult } from './types';
import { Validity, parseValidityDates } from './validity';

export type CalculatedAttributes = {
  validityDates: ParserResult<Validity>;
};

export function calculateAttributes(parsedJson: VC): CalculatedAttributes {
  return {
    validityDates: parseValidityDates(parsedJson),
  };
}
