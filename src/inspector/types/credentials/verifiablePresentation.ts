/**
 * Verifiable Presentation
 */
export type VP = {
  type: Result<string[]>;
  context: Result<Context[]>;
  credentials: Result<VC>[];
  proofs: ListResult<Proof>;
};
