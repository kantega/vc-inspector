export function isStrRecord(obj: unknown): obj is Record<string, unknown> {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    !Array.isArray(obj) &&
    Object.keys(obj).every((k) => typeof k === 'string')
  );
}

export function isPrimitive(obj: unknown): obj is string | number | boolean {
  return typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean';
}
