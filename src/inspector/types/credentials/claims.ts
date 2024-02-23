import { z } from 'zod';

export const baseClaimSchema = z.object({
  key: z.string(),
});

export type Claim = z.infer<typeof baseClaimSchema> & {
  value: JSONType | Claim[];
};

export const ClaimSchema: z.ZodType<Claim> = baseClaimSchema.extend({
  value: JSONTypeSchema.or(z.lazy(() => z.array(ClaimSchema))),
});
