import { Result } from './errors';
import { Standards } from './standards';

export type ParserResult<T> = Record<Standards, Result<T>>;
export type ReasonedOptional<T> = { kind: 'some'; value: T } | { kind: 'none'; reason: string };
export type StandardParsers<T> = { standard: Standards; parser: (obj: unknown) => Result<T> }[];
