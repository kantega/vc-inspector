import { ListResult, Result } from '@/inspector/types/errors';

export type URL = string;

export type Issuer =
  | {
      kind: 'WithName';
      id: URL;
      name: string;
      description?: string;
    }
  | {
      kind: 'JustId';
      id: URL;
    };

/**
 * Another type would be a Record, but claims are records
 */
export type JSONType = string | number | boolean | null | JSONType[];

/**
 * Needs to be separated from JSONType
 * because the first claim is a record
 */
export type Claim = {
  key: string;
  value: JSONType | Claim[];
};

export type Subject = {
  id?: URL;
  claims: Claim[];
};

export type SecuringMechanism = 'Enveloping' | 'Embedded';

export type Proof = {
  type: SecuringMechanism;
};

export type Validity = {
  isValid: boolean;
  validFrom?: Date;
  validUntil?: Date;
  proof: ListResult<Proof>;
};

export type Format = {
  name: string;
  /*
   * If the format is not JSON,
   * this value is the JSON representation
   */
  convertedToJSON?: string;
};

export type CredentialSchema = {
  type: string;
  id: URL;
};

export type Context = {
  name?: string;
  url: URL;
};

export type eIDAS2 = {
  validToStandard: boolean;
};

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

/**
 * Verifiable Presentation
 */
export type VP = {
  type: Result<string[]>;
  context: Result<Context[]>;
  credentials: Result<VC>[];
  proofs: ListResult<Proof>;
};

export type Inspector =
  | {
      kind: 'VCredential';
      value: VC;
    }
  | {
      kind: 'VPresentation';
      value: VP;
    };
