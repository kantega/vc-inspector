import { z } from 'zod';

export const ProofSchema = z.object({
  type: z.string(),
  cryptosuite: z.string(),
  created: z.string(),
  proofPurpose: z.string(),
  verificationMethod: z.string().url(),
  proofValue: z.string(),
});

export type Proof = z.infer<typeof ProofSchema>;
