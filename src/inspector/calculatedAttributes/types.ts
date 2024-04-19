import { ReasonedError, Result } from './errors';
import { Standards } from './standards';

export type ParserResult<T> = Record<Standards, Result<T>>;
export type ReasonedOptional<T> = { kind: 'some'; value: T } | { kind: 'none'; reason: string };

export function getSomeValue<T>(optional: ReasonedOptional<T>): T | undefined {
  if (optional.kind === 'some') return optional.value;
}

/**
 * Simple class to store the standard used and retrieve results
 * with the same standard.
 */
export class StandardRetriever {
  private standard: Standards;
  public constructor(standard: Standards) {
    this.standard = standard;
  }
  /**
   * Turn the result type of a standard into its contained
   * type if it is ok or undefined otherwise.
   */
  public extractOk<T>(standardResults: ParserResult<T>): T | undefined {
    let res = standardResults[this.standard];
    if (res.kind === 'ok') return res.value;
  }

  /**
   * Get the result type from the standard
   */
  public getResult<T>(standardResults: ParserResult<T>): Result<T> {
    return standardResults[this.standard];
  }
}

export type StandardParsers<T> = { standard: Standards; parser: (obj: unknown) => Result<T> }[];

/*
 * Helper method for converting standardParsers to Parser Result.
 *
 * Note that this does not take into consideration if the standardParsers does not contain all th e ParserResult */
export function standardParsersToParserResult<T>(standardParsers: StandardParsers<T>, obj: unknown): ParserResult<T> {
  return Object.fromEntries(standardParsers.map(({ standard, parser }) => [standard, parser(obj)])) as ParserResult<T>;
}

export function unimplementedParser(_: unknown): { kind: 'error'; error: ReasonedError } {
  return { kind: 'error', error: { name: 'Unimplemented', message: 'Parser is not implemented' } };
}

export function addReasonIfUndefined<T>(obj: T | undefined, reason: string): ReasonedOptional<T> {
  if (obj) {
    return { kind: 'some', value: obj };
  }
  return { kind: 'none', reason };
}

export function toSome<T>(obj: T): { kind: 'some'; value: T } {
  return { kind: 'some', value: obj };
}
