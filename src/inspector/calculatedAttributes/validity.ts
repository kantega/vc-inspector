import { ValiditySchemaType } from '../credentialSchemas/validity';
import { ErrorReason, Result } from './errors';
import { Standards } from './standards';
import { ParserResult, ReasonedOptional, StandardParsers } from './types';

export type Validity = {
  isValid: boolean;
  validityDates: ValidityDates;
};

export type ValidityDates = {
  validFrom: ReasonedOptional<Date>;
  validUntil: ReasonedOptional<Date>;
};

const validityParsers: StandardParsers<ValiditySchemaType, ValidityDates> = [
  { standard: Standards.W3C_V2, parser: W3CV2ValidityDatesParser },
  { standard: Standards.W3C_V1, parser: W3CV1ValidityDatesParser },
  { standard: Standards.EIDAS2_0, parser: W3CV1ValidityDatesParser },
];

/**
 * Parses the validity dates of an VC of different standards.
 *
 * Returns a list of all standards and if they are compliant
 */
export function parseValidityDates(parsedJson: unknown): ParserResult<Validity> {
  const results: Partial<ParserResult<Validity>> = {};

  for (const parser of validityParsers) {
    const validityDates = parser.parser(parsedJson);

    if (validityDates.kind === 'error') {
      results[parser.standard] = validityDates;
      continue;
    }

    const today = new Date();
    const isValid =
      (validityDates.value.validFrom.kind !== 'some' || validityDates.value.validFrom.value <= today) &&
      (validityDates.value.validUntil.kind !== 'some' || validityDates.value.validUntil.value >= today);

    results[parser.standard] = { kind: 'ok', value: { isValid, validityDates: validityDates.value } };
  }

  return results as ParserResult<Validity>;
}

function W3CV2ValidityDatesParser(obj: unknown): Result<ValidityDates> {
  let result: ValidityDates = {
    validFrom: {
      kind: 'none',
      reason: 'validFrom is missing',
    },
    validUntil: {
      kind: 'none',
      reason: 'validUntil is missing',
    },
  };

  if (obj.validFrom) {
    result.validFrom = { kind: 'some', value: new Date(obj.validFrom) };
  }

  if (obj.validUntil) {
    result.validUntil = { kind: 'some', value: new Date(obj.validUntil) };
  }

  return { kind: 'ok', value: result };
}

function W3CV1ValidityDatesParser(obj: ValiditySchemaType): Result<ValidityDates> {
  if (!obj.issuanceDate) {
    return {
      kind: 'error',
      error: { name: 'Missing', message: 'issuanceDate is required', reason: ErrorReason.Missing },
    };
  }

  let result: ValidityDates = {
    validFrom: {
      kind: 'some',
      value: new Date(obj.issuanceDate),
    },
    validUntil: {
      kind: 'none',
      reason: 'expirationDate is missing',
    },
  };

  if (obj.expirationDate) {
    result.validUntil = { kind: 'some', value: new Date(obj.expirationDate) };
  }

  return { kind: 'ok', value: result };
}
