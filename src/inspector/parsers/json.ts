import { Result } from '../calculatedAttributes/results';
import { getErrorMessage } from '../errorHandling';

export type ParsedJson = {
  type: 'JSON';
  payload: JSON;
};

export function safeJsonParse(credential: string): Result<ParsedJson> {
  try {
    return { kind: 'ok', value: { type: 'JSON', payload: JSON.parse(credential) } };
  } catch (e) {
    return { kind: 'error', error: { name: 'JSON Parse Error', message: getErrorMessage(e) } };
  }
}
