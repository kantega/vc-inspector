import { z } from 'zod';

const baseJSONTypeSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

export type JSONType = z.infer<typeof baseJSONTypeSchema> | JSONType[];

export const JSONTypeSchema: z.ZodType<JSONType> = baseJSONTypeSchema.or(z.lazy(() => JSONTypeSchema.array()));
