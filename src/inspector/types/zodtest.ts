import { z } from 'zod';

export const IssuerSchema = z.union([
  z.string(),
  z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
  }),
]);

export const ContextSchema = z.object({
  name: z.string().optional(),
  url: z.string().url(),
});

export const VCSchema = z.object({
  issuer: IssuerSchema,
  context: ContextSchema,
});

export type VC = z.infer<typeof VCSchema>;
