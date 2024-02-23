import { z } from 'zod';

export const CredentialSchemaSchema = z.object({
  type: z.string(),
  id: z.string().url(),
});

export type CredentialSchema = z.infer<typeof CredentialSchemaSchema>;
