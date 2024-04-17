import { Result } from '../../calculatedAttributes/errors';
import { base64url } from 'jose';

type TypedByteArray = {
  byteType: 'hex' | 'base64' | 'base64url';
  byteArray: Uint8Array;
};

export function anyToByteArray(credential: string): Result<TypedByteArray>[] {
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

  let byteArray;
  try {
    byteArray = base64url.decode(credential);
  } catch (e) {
    return { kind: 'error', error: e as Error };
  }

  // Webpack does not support base64url on Buffer.from i think
  return { kind: 'ok', value: { byteType: 'base64url', byteArray: base64url.decode(credential) } };
}
