/**
 * Verifiable Credential
 */
export type VC = {
  id?: URL;
  type: Result<string[]>;
  context: ListResult<Context>;
  issuer: Result<Issuer>;
  credentialSubject: ListResult<Subject>;
  validity: Result<Validity>;
  format: Result<Format>;
  eIDAS2?: eIDAS2;
  /**
   * How the credential claims are structured
   * Has links which can be used to validate the credential
   * Can be a single object in the raw credential, but
   * is here defined as a list
   */
  claimsSchema?: ListResult<CredentialSchema>;
};
