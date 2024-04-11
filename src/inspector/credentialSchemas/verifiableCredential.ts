import { z } from 'zod';
import { ContextSchema } from './context';
import { IssuerSchema } from './issuer';
import { CredentialSubjectSchema } from './credentialSubject';
import { ProofSchema } from './proof';
import { ValiditySchema } from './validity';
/**
 * Verifiable Credential
 */
// export type VC = {
//   id?: URL;
//   type: Result<string[]>;
//   context: ListResult<Context>;
//   issuer: Result<Issuer>;
//   credentialSubject: ListResult<Subject>;
//   validity: Result<Validity>;
//   format: Result<Format>;
//   eIDAS2?: eIDAS2;
//   /**
//    * How the credential claims are structured
//    * Has links which can be used to validate the credential
//    * Can be a single object in the raw credential, but
//    * is here defined as a list
//    */
//   claimsSchema?: ListResult<CredentialSchema>;
// };

export const VCSchema = z
  .object({
    id: z.string().optional(),
    type: z.array(z.string()),
    '@context': ContextSchema,
    issuer: IssuerSchema,
    credentialSubject: CredentialSubjectSchema,
    proof: ProofSchema.optional(),
  })
  .merge(ValiditySchema);

export type VC = z.infer<typeof VCSchema>;
