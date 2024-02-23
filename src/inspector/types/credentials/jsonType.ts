const baseJSONTypeSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

type JSONType = z.infer<typeof baseJSONTypeSchema> | JSONType[];

const JSONTypeSchema: z.ZodType<JSONType> = baseJSONTypeSchema.or(z.lazy(() => JSONTypeSchema.array()));
