import * as z from 'zod';

/**
 * Switches out the "Required" error message
 * to "This field is required...".
 * Remember to register this error map globally before use
 */
export const requiredErrorMap: z.ZodErrorMap = (error, ctx) => {
  if (error.code === z.ZodIssueCode.invalid_type && error.received === 'undefined') {
    return { message: 'This field is required, but was not given.' };
  }
  return { message: ctx.defaultError };
};

/**
 * Function to display a custom error message when a field
 * fails on a schema
 * Example:
 * ```typescript
 * import { zodRequiredErrorMessage as em } from './errorHandling';
 *
 * const schema = z.string(em("This field is required"));
 * ```
 */
export function zodRequiredErrorMessage(message: string) {
  return { required_error: message };
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}
