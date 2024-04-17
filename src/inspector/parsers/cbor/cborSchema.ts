import { z } from 'zod';

export const cborSchema = z.object({
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
