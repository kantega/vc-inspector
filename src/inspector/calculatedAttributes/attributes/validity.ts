import { z } from 'zod';
import { ParserResult, ReasonedOptional, StandardParsers, addReasonIfUndefined, toSome } from '../types';
import { Standards } from '../standards';
import { Result } from '../results';

export type Validity = {
  isValid: boolean;
  validityDates: ValidityDates;
};

export type ValidityDates = {
  validFrom: ReasonedOptional<Date>;
  validUntil: ReasonedOptional<Date>;
};

const validityParsers: StandardParsers<ValidityDates> = [
  { standard: Standards.W3C_V2, parser: W3CV2ValidityDatesParser },
  { standard: Standards.W3C_V1, parser: W3CV1ValidityDatesParser },
  { standard: Standards.MDOC, parser: MDOCValidityDatesParse },
];

/**
 * Parses the validity dates of an VC of different standards.
 *
 * Returns a list of all standards and if they are compliant
 */
export function parseValidityDates(obj: unknown): ParserResult<Validity> {
  const results: Partial<ParserResult<Validity>> = {};

  for (const parser of validityParsers) {
    const validityDates = parser.parser(obj);

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
  const schema = z.object({
    validFrom: z.coerce.date().optional(),
    validUntil: z.coerce.date().optional(),
  });

  const parsed = schema.safeParse(obj);

  if (!parsed.success) {
    return { kind: 'error', error: parsed.error };
  }

  return {
    kind: 'ok',
    value: {
      validFrom: addReasonIfUndefined(parsed.data.validFrom, 'Missing validFrom'),
      validUntil: addReasonIfUndefined(parsed.data.validUntil, 'Missing validUntil'),
    },
  };
}

function W3CV1ValidityDatesParser(obj: unknown): Result<ValidityDates> {
  const schema = z.object({
    issuanceDate: z.coerce.date(),
    expirationDate: z.coerce.date().optional(),
  });

  const parsed = schema.safeParse(obj);

  if (!parsed.success) {
    return { kind: 'error', error: parsed.error };
  }

  return {
    kind: 'ok',
    value: {
      validFrom: toSome(parsed.data.issuanceDate),
      validUntil: addReasonIfUndefined(parsed.data.expirationDate, 'expirationDate is missing'),
    },
  };
}

function MDOCValidityDatesParse(obj: unknown): Result<ValidityDates> {
  const schema = z.object({
    issuerSigned: z.object({
      issuerAuth: z.tuple([
        z.any(),
        z.any(),
        z.object({
          validityInfo: z.object({
            validFrom: z.coerce.date(), // TODO: Check if actually is required
            validUntil: z.coerce.date(), // TODO: Check if actually is required
          }),
        }),
        z.any(),
      ]),
    }),
  });

  const parsed = schema.safeParse(obj);

  if (!parsed.success) {
    return { kind: 'error', error: parsed.error };
  }

  const validityInfo = parsed.data.issuerSigned.issuerAuth[2].validityInfo;
  return {
    kind: 'ok',
    value: {
      validFrom: toSome(validityInfo.validFrom),
      validUntil: toSome(validityInfo.validUntil),
    },
  };
}
