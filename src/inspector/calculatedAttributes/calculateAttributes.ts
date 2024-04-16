import { ParserResult } from './types';
import { Validity, parseValidityDates } from './validity';

export type CalculatedAttributes = {
  validityDates: ParserResult<Validity>;
};

export function calculateAttributes(parsedJson: unknown): CalculatedAttributes {
  return {
    validityDates: parseValidityDates(parsedJson),
  };
}
