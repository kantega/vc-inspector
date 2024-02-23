export type Validity = {
  isValid: boolean;
  validFrom?: Date;
  validUntil?: Date;
  proof: ListResult<Proof>;
};
