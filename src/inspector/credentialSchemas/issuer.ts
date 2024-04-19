import { z } from 'zod';

export const IssuerSchema = z.union([
  z.string(),
  z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
  }),
]);

export type Issuer = z.infer<typeof IssuerSchema>;
