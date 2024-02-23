import { z } from 'zod';

export const ValiditySchema = z.object({
  validFrom: z.string().optional(),
  validUntil: z.string().optional(),
});
