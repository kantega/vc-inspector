import { Result, firstOk } from '../../calculatedAttributes/errors';
import cbor from 'cbor';
import { anyToByteArray } from './toByteArray';
import { CBOR, cborSchema } from './cborSchema';

export type ParsedCBOR = {
  type: 'CBOR';
  byteType: 'hex' | 'base64' | 'base64url';
  payload: CBOR;
};

export function safeCBORParse(credential: string): Result<ParsedCBOR> {
  const decoded = firstOk(anyToByteArray(credential));

  if (decoded.kind === 'error') {
    return {
      kind: 'error',
      error: {
        name: 'No byteformat detected',
        message: 'Not one of the supported byte formats (hex, base64url, base64)',
      },
    };
  }

  let cborDecoded = cbor.decodeFirstSync(decoded.value.byteArray, {
    max_depth: 500,
    tags: { 24: (x: Uint8Array) => cbor.decodeFirstSync(x) },
  });

  // Sometimes the issuer auth is tagged, hence this
  if (cborDecoded.issuerSigned.issuerAuth[2] instanceof Uint8Array) {
    cborDecoded.issuerSigned.issuerAuth[2] = cbor.decodeFirstSync(cborDecoded.issuerSigned.issuerAuth[2], {
      tags: { 24: (x: Uint8Array) => cbor.decodeFirstSync(x) },
    });
  }

  console.log(cborSchema.strict().safeParse(cborDecoded));

  return {
    kind: 'ok',
    value: {
      type: 'CBOR',
      byteType: decoded.value.byteType,
      payload: cborDecoded,
    },
  };
}
