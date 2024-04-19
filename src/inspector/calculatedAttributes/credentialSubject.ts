import { z } from 'zod';
import { Result, toError, toOk } from './errors';
import { Standards } from './standards';
import { ParserResult, StandardParsers, standardParsersToParserResult } from './types';
import { Primitive, isPrimitive, isStrRecord } from '../assertTypes';

export type CredentialSubject = {
  id?: string;
  claims: Claim[];
};

export type ClaimValue = Primitive | Claim[];

export type Claim =
  | {
      sd: false;
      key: string;
      value: ClaimValue;
    }
  | {
      sd: true;
      key: string;
      value: ClaimValue;
      salt: Uint8Array;
      digestID?: number;
    };

export function isClaimList(obj: ClaimValue): obj is Claim[] {
  return Array.isArray(obj) && obj.every((c) => 'sd' in c && 'key' in c && 'value' in c);
}

const credentialSubjectParsers: StandardParsers<CredentialSubject> = [
  { standard: Standards.W3C_V1, parser: W3CCredentialSubjectParser },
  { standard: Standards.W3C_V2, parser: W3CCredentialSubjectParser },
  { standard: Standards.MDOC, parser: MDOCCredentialSubjectParser },
];

export function parseCredentialSubject(obj: unknown): ParserResult<CredentialSubject> {
  // TODO: Credential Subject can be a list
  return standardParsersToParserResult(credentialSubjectParsers, obj);
}

function MDOCCredentialSubjectParser(obj: unknown): Result<CredentialSubject> {
  const schema = z.object({
    issuerSigned: z.object({
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

  const parsed = schema.safeParse(obj);

  if (!parsed.success) {
    return toError(parsed.error);
  }

  const nameSpaces = Object.values(parsed.data.issuerSigned.nameSpaces);

  // TODO: Where is the id?
  // TODO: Will there be multiple nameSpaces?
  const claims: Claim[] = nameSpaces.flatMap((nameSpace) => {
    return nameSpace.map((claim) => {
      return {
        sd: true,
        key: claim.elementIdentifier,
        value: claim.elementValue,
        digestID: claim.digestID,
        salt: claim.random,
      };
    });
  });

  return toOk({ claims });
}

function unknownToClaimValue(claim: unknown): ClaimValue {
  if (isStrRecord(claim)) {
    return Object.entries(claim).map(([key, value]) => ({
      sd: false,
      key: key,
      value: unknownToClaimValue(value),
    }));
  } else if (isPrimitive(claim)) {
    return claim;
  } else if (Array.isArray(claim)) {
    return claim.map((c, i) => ({
      sd: false,
      key: `${i}`,
      value: unknownToClaimValue(c),
    }));
  }
  throw new Error(`Unknown claim value: ${claim}`);
}

function W3CCredentialSubjectParser(obj: unknown): Result<CredentialSubject> {
  const schema = z.object({
    credentialSubject: z.record(z.string(), z.unknown()),
  });

  const parsed = schema.safeParse(obj);

  if (!parsed.success) {
    return toError(parsed.error);
  }
  const subject = parsed.data.credentialSubject;

  const id = typeof subject.id == 'string' ? subject.id : undefined;
  delete subject.id;

  try {
    const claims = unknownToClaimValue(subject);
    if (isClaimList(claims)) {
      return toOk({ id, claims });
    }
  } catch (e) {
    if (e instanceof Error) {
      return toError(e);
    }
  }

  return toError({
    name: 'Invalid credential subject',
    message: 'Expected credential subject to be a an object of claims. ' + String(subject),
  });
}
