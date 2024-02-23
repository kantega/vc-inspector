import { z } from 'zod';

export const ContextSchema = z.object({
  name: z.string().optional(),
  url: z.string().url(),
});

export type Context = {
  name?: string;
  url: URL;
};
