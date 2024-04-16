import z, { ZodError } from 'zod';
import { VC, VCSchema } from './credentialSchemas/verifiableCredential';
import { CalculatedAttributes, calculateAttributes } from './calculatedAttributes/calculateAttributes';
import { ReasonedError, Result } from './calculatedAttributes/errors';
import * as jose from 'jose';
import { JWTPayload } from 'jose';
import { requiredErrorMap } from './errorHandling';
import { ParsedCBOR, safeCBORParse } from './parsers/cbor/parser';

z.setErrorMap(requiredErrorMap);

export default function inspect(credential: string): InspectionResult {
  const parsedJson = credentialToJSON(credential);
  if (parsedJson.kind == 'error') {
    return {
      type: 'ParseError',
      errors: parsedJson.error,
    };
  }

  // const parsedSchema = VCSchema.safeParse(parsedJson.value.payload);

  return {
    type: 'Parsed',
    parsedJson: parsedJson.value,
    calculatedAttributes: calculateAttributes(parsedJson.value.payload),
  };
}

type ParsedJWT = {
  type: 'JWT';
  jwtPayload: JWTPayload;
  payload: JSON;
};

type ParsedJson = {
  type: 'JSON';
  payload: JSON;
};

type ParsedCredential = ParsedJson | ParsedJWT | ParsedCBOR;

function credentialToJSON(credential: string): Result<ParsedCredential, Error[]> {
  const parsers = [safeJsonParse, safeJWTParse];
  let errors = [];

  for (const parser of parsers) {
    const result = parser(credential);
    if (result.kind == 'ok') {
      return result;
    } else {
      errors.push(result.error);
    }
  }

  return { kind: 'error', error: errors };
}

function safeJsonParse(credential: string): Result<ParsedJson> {
  try {
    return { kind: 'ok', value: { type: 'JSON', payload: JSON.parse(credential) } };
  } catch (e) {
    return { kind: 'error', error: e as ReasonedError };
  }
}

function safeJWTParse(credential: string): Result<ParsedJWT> {
  try {
    const { vc, ...jwtPayload } = jose.decodeJwt(credential);
    return {
      kind: 'ok',
      value: {
        type: 'JWT',
        payload: vc as JSON,
        jwtPayload,
      },
    };
  } catch (e) {
    return { kind: 'error', error: e as ReasonedError };
  }
}

export type InspectionResult =
  | {
      type: 'ParseError';
      errors: Error[];
    }
  | {
      type: 'Parsed';
      parsedJson: unknown;
      calculatedAttributes: CalculatedAttributes;
    };
