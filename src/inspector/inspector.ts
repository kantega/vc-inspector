import { ZodError } from 'zod';
import { VC, VCSchema } from './credentialSchemas/verifiableCredential';
import { CalculatedAttributes, calculateAttributes } from './calculatedAttributes/calculateAttributes';

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

    return {
      type: 'ValidCredential',
      parsedJson: parsedJson as VC,
      calculatedAttributes: calculateAttributes(parsedSchema.data),
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
    calculatedAttributes: CalculatedAttributes;
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
