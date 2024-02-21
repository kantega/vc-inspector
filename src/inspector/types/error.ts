export enum ErrorReason {
  ParseError,
  Invalid,
  Missing,
}

export type ReasonedError = {
  name: string;
  message: string;
  reason: ErrorReason;
}

export type Result<T, E = ReasonedError> =
  | { kind: "ok"; value: T }
  | { kind: "error"; error: E }
// | { kind: "partial" ; value: Partial<T>; error: E };


export type AllResult<T, E = ReasonedError> = {
    [P in keyof T]: Result<T[P], E>;
};

export type ListResult<T, EItem = ReasonedError, EList = ReasonedError> = Result<Result<T, EItem>[], EList>
