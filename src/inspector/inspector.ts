import z from 'zod';
import { CalculatedAttributes, calculateAttributes } from './calculatedAttributes/calculateAttributes';
import { ReasonedError, Result } from './calculatedAttributes/results';
import { requiredErrorMap } from './errorHandling';
import { ParsedCBOR, safeCBORParse } from './parsers/cbor/parser';
import { ParsedJson, safeJsonParse } from './parsers/json';
import { ParsedJWT, safeJWTParse } from './parsers/jwt';

z.setErrorMap(requiredErrorMap);

export type ParseError = {
  success: false;
  errors: ReasonedError[];
};

export type SuccessfullParse = {
  success: true;
  parsedJson: ParsedCredential;
  calculatedAttributes: CalculatedAttributes;
};

/**
 * This type represents the result of the inspection.
 * It can either be a ParseError or a SuccessfullParse.
 * The SuccessfullParse contains the parsed credential and the calculated attributes.
 * The ParseError contains the errors that occured during parsing.
 */
export type InspectionResult = ParseError | SuccessfullParse;

/**
 * This function is the entry point for the inspector.
 * It takes a credential and returns an InspectionResult.
 *
 * Current supported formats are JSON, JWT and CBOR.
 * Formats such as SD-JWT are not supported.
 */
export default function inspect(credential: string): InspectionResult {
  const parsedJson = credentialToJSON(credential);
  if (parsedJson.kind == 'error') {
    return {
      success: false,
      errors: parsedJson.error,
    };
  }

  return {
    success: true,
    parsedJson: parsedJson.value,
    calculatedAttributes: calculateAttributes(parsedJson.value.payload),
  };
}

export type ParsedCredential = ParsedJson | ParsedJWT | ParsedCBOR;

/**
 * This function takes a credential and tries to parse it as JSON, JWT and CBOR.
 */
function credentialToJSON(credential: string): Result<ParsedCredential, ReasonedError[]> {
  const parsers = [safeJsonParse, safeJWTParse, safeCBORParse];
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
