import { ReasonedError, Result } from './results';
import { Standards } from './standards';
import { ZodError } from 'zod';

/**
 * ParserResult is a record of the results of parsing an object with a parser for each standard.
 */
export type ParserResult<T> = Record<Standards, Result<T>>;

/**
 * Optional type that includes a reason for why the value is not present.
 */
export type ReasonedOptional<T> = { kind: 'some'; value: T } | { kind: 'none'; reason: string };

/**
 * Helper method for {@link ReasonedOptional} that adds a reason if the object is undefined.
 */
export function addReasonIfUndefined<T>(obj: T | undefined, reason: string): ReasonedOptional<T> {
  if (obj) {
    return { kind: 'some', value: obj };
  }
  return { kind: 'none', reason };
}

export function toSome<T>(obj: T): { kind: 'some'; value: T } {
  return { kind: 'some', value: obj };
}

export function toNone(reason: string): { kind: 'none'; reason: string } {
  return { kind: 'none', reason };
}

/**
 * Casts an object to a ZodError if it contains defining
 * fields of a ZodError connected and ZodIssues.
 */
export function isZodError(obj: unknown): obj is ZodError {
  return (
    obj instanceof Error &&
    'issues' in obj &&
    Array.isArray(obj.issues) &&
    obj.issues.every((issue) => 'code' in issue && 'message' in issue)
  );
}

/**
 * StandardParsers is a list of parsers that are associated with a standard.
 */
export type StandardParsers<T> = { standard: Standards; parser: (obj: unknown) => Result<T> }[];

/*
 * Helper method for converting standardParsers to Parser Result.
 *
 * Note that this does not take into consideration if the standardParsers does not contain all the ParserResult
 */
export function standardParsersToParserResult<T>(standardParsers: StandardParsers<T>, obj: unknown): ParserResult<T> {
  return Object.fromEntries(standardParsers.map(({ standard, parser }) => [standard, parser(obj)])) as ParserResult<T>;
}

/**
 * Helper variable for defining a unimplemented parser for a standard that is not implemented yet.
 */
export const unimplementedParser: (obj: unknown) => { kind: 'error'; error: ReasonedError } = (_: unknown) => {
  return {
    kind: 'error',
    error: {
      name: 'Unimplemented',
      message: 'Parser is not implemented',
    },
  };
};
