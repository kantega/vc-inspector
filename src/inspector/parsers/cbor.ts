import { Result, firstOk } from '../calculatedAttributes/errors';
import cbor from 'cbor';
import { base64url } from 'jose';
import { z } from 'zod';

type ParsedCBOR = {
  type: 'CBOR';
  byteType: 'hex' | 'base64' | 'base64url';
  cbor: CBOR;
};

type TypedByteArray = {
  byteType: 'hex' | 'base64' | 'base64url';
  byteArray: Uint8Array;
};

const cborSchema = z.object({
  docType: z.string(),
  issuerSigned: z.object({
    issuerAuth: z.tuple([
      z.instanceof(Uint8Array),
      z.map(z.number(), z.instanceof(Uint8Array)),
      z.object({
        deviceKeyInfo: z.object({
          deviceKey: z.map(z.number(), z.instanceof(Uint8Array)),
        }),
        digestAlgorithm: z.string(), // TODO: use enum here
        docType: z.string(), // TODO: add validation
        validityInfo: z.object({
          signed: z.date(),
          validFrom: z.date(),
          validUntil: z.date(),
        }),
        valueDigests: z.record(z.string(), z.map(z.number(), z.instanceof(Uint8Array))),
        version: z.string(),
      }),
      z.instanceof(Uint8Array),
    ]),
    nameSpaces: z.record(
      z.string(),
      z.array(
        z.object({
          digestID: z.number(),
          elementIdentifier: z.string(),
          elementValue: z.any(),
          random: z.instanceof(Uint8Array),
        }),
      ),
    ),
  }),
});

export type CBOR = z.infer<typeof cborSchema>;

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

  console.log(decoded);

  let cborDecoded = cbor.decodeFirstSync(decoded.value.byteArray, {
    max_depth: 500,
    tags: { 24: (x: Uint8Array) => cbor.decodeFirstSync(x) },
  });

  console.log('First decode done', cborDecoded);

  // Sometimes the issuer auth is tagged, hence this
  if (cborDecoded.issuerSigned.issuerAuth[2] instanceof Uint8Array) {
    cborDecoded.issuerSigned.issuerAuth[2] = cbor.decodeFirstSync(cborDecoded.issuerSigned.issuerAuth[2], {
      tags: { 24: (x: Uint8Array) => cbor.decodeFirstSync(x) },
    });
  }

  console.log('schema', cborSchema.strict().safeParse(cborDecoded));

  console.log('cbor', cborDecoded);
  return {
    kind: 'ok',
    value: {
      type: 'CBOR',
      byteType: decoded.value.byteType,
      cbor: cborDecoded,
    },
  };
}

function anyToByteArray(credential: string): Result<TypedByteArray>[] {
  return [fromHex, fromBase64, fromBase64url].map((byteParser) => byteParser(credential));
}

function fromHex(credential: string): Result<TypedByteArray> {
  // Buffer.from does not check if it is valid hex so its done manually
  if (!Boolean(credential.match(/^[0-9a-f]+$/i))) {
    return {
      kind: 'error',
      error: {
        name: 'Invalid Hex String',
        message: credential + ', is not a valid hex string',
      },
    };
  }

  return { kind: 'ok', value: { byteType: 'hex', byteArray: Buffer.from(credential, 'hex') } };
}

function fromBase64(credential: string): Result<TypedByteArray> {
  // Buffer.from does not check if it is valid base64 so its done manually
  if (!Boolean(credential.match(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/i))) {
    return {
      kind: 'error',
      error: {
        name: 'Invalid Base64 String',
        message: credential + ', is not a valid hex string',
      },
    };
  }

  return { kind: 'ok', value: { byteType: 'base64', byteArray: Buffer.from(credential, 'base64') } };
}

function fromBase64url(credential: string): Result<TypedByteArray> {
  // Buffer.from does not check if it is valid base64 so its done manually
  if (!Boolean(credential.match(/^[A-Za-z0-9_-]+$/i))) {
    return {
      kind: 'error',
      error: {
        name: 'Invalid Base64url String',
        message: credential + ', is not a valid hex string',
      },
    };
  }

  // Webpack does not support base64url on Buffer.from i think
  return { kind: 'ok', value: { byteType: 'base64url', byteArray: base64url.decode(credential) } };
}
