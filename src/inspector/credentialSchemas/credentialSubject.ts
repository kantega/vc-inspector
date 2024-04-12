import { z } from 'zod';

export const CredentialSubjectSchema = z.object({
  id: z.string(),
}).and(z.record(z.unknown()))
