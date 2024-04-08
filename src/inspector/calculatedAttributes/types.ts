import { Result } from './errors';
import { Standards } from './standards';

export type ParserResult<T> = Partial<Record<Standards, Result<T>>>;
export type ReasonedOptional<T> = { kind: 'some'; value: T } | { kind: 'none'; reason: string };
export type StandardParsers<T, S> = { standard: Standards; parser: (obj: T) => Result<S> }[];
