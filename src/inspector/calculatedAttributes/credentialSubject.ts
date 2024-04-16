import { z } from 'zod';
import { Result, toError, toOk } from './errors';
import { Standards } from './standards';
import { ParserResult, StandardParsers, standardParsersToParserResult } from './types';

export type CredentialSubject = {
  id?: string;
  claims: Claim[];
};

export type Claim =
  | {
      sd: false;
      key: string;
      value: unknown | Claim[];
    }
  | {
      sd: true;
      key: string;
      value: unknown | Claim[];
      salt: Uint8Array;
      digestID?: number;
    };

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
function W3CCredentialSubjectParser(obj: unknown): Result<CredentialSubject> {
  const schema = z.object({
    id: z.string().optional(),
    credentialSubject: z.record(z.string(), z.unknown()),
  });

  const parsed = schema.safeParse(obj);

  if (!parsed.success) {
    return toError(parsed.error);
  }

  // TODO: Add recursive types
  const claims: Claim[] = Object.entries(parsed.data.credentialSubject).map(([key, value]) => {
    return {
      sd: false,
      key,
      value,
    };
  });

  return toOk({ id: parsed.data.id, claims });
}
