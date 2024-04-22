import { Result } from './results';
import { Standards } from './standards';
import { ParserResult } from './types';

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
