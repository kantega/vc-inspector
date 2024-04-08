import { z } from 'zod';

export const ValiditySchema = z.object({
  validFrom: z.string().datetime().optional(),
  validUntil: z.string().datetime().optional(),
  issuanceDate: z.string().datetime().optional(),
  expirationDate: z.string().datetime().optional(),
});

export type ValiditySchemaType = z.infer<typeof ValiditySchema>;
