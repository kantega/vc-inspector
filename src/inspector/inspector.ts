import { ZodError } from 'zod';
import { VC, VCSchema } from './credentialSchemas/verifiableCredential';
import { parseValidity, Validity, ParserResult } from './calculatedAttributes/validity';

export default function inspect(credential: string): InspectionResult {
  try {
    const parsedJson = JSON.parse(credential);
    const parsedSchema = VCSchema.safeParse(parsedJson);

    if (!parsedSchema.success) {
      return {
        type: 'InvalidCredential',
        parsedJson,
        error: parsedSchema.error,
      };
    }

    console.log('halla', parseValidity(parsedJson));
    return {
      type: 'ValidCredential',
      parsedJson: parsedJson as VC,
      calculatedAttributes: parseValidity(parsedJson),
    };
  } catch (e) {
    return {
      type: 'ParseError',
      error: e as Error,
    };
  }
}

export type InspectionResult =
  | {
      type: 'ParseError';
      error: Error;
    }
  | {
      type: 'InvalidCredential';
      parsedJson: object;
      error: ZodError;
    }
  | {
      type: 'ValidCredential';
      parsedJson: VC;
      calculatedAttributes: ParserResult<Validity>;
    };
//
// export type Inspector =
//   | {
//       kind: 'VCredential';
//       value: VC;
//     }
//   | {
//       kind: 'VPresentation';
//       value: VP;
//     };
