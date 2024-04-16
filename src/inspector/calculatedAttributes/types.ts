import { Result } from './errors';
import { Standards } from './standards';

export type ParserResult<T> = Record<Standards, Result<T>>;
export type ReasonedOptional<T> = { kind: 'some'; value: T } | { kind: 'none'; reason: string };
export type StandardParsers<T, S> = { standard: Standards; parser: (obj: T) => Result<S> }[];

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
