import { z } from 'zod';

export const ContextSchema = z.array(z.string().url());

export type Context = z.infer<typeof ContextSchema>;
