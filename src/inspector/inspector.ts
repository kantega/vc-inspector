import { ZodError } from 'zod';
import { VC, VCSchema } from './credentialSchemas/verifiableCredential';
import { CalculatedAttributes, calculateAttributes } from './calculatedAttributes/calculateAttributes';
import { ErrorReason, ReasonedError, Result } from './calculatedAttributes/errors';
import * as jose from 'jose';
import { JWTPayload } from 'jose';
import { ReasonedOptional } from './calculatedAttributes/types';

export default function inspect(credential: string): InspectionResult {
  const parsedJson = credentialToJSON(credential);
  if (parsedJson.kind == 'error') {
    return {
      type: 'ParseError',
      errors: parsedJson.error,
    };
  }

  const parsedSchema = VCSchema.safeParse(parsedJson.value.payload);

  if (!parsedSchema.success) {
    return {
      type: 'InvalidCredential',
      parsedJson: parsedJson.value,
      error: parsedSchema.error,
    };
  }

  return {
    type: 'ValidCredential',
    parsedJson: parsedSchema.data,
    calculatedAttributes: calculateAttributes(parsedSchema.data),
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

type ParsedCredential = ParsedJson | ParsedJWT;

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

export type ParseErrorResult = {
  type: 'ParseError';
  errors: Error[];
};

export type InvalidCredentialResult = {
  type: 'InvalidCredential';
  parsedJson: ParsedCredential;
  error: ZodError;
};
export type ValidCredentialResult = {
  type: 'ValidCredential';
  parsedJson: VC;
  calculatedAttributes: CalculatedAttributes;
};

export type InspectionResult = ParseErrorResult | InvalidCredentialResult | ValidCredentialResult;
