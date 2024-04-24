const exampleCredential = {
  '@context': [
    'https://www.w3.org/ns/credentials/v2',
    'https://www.w3.org/ns/credentials/examples/v2',
    'https://w3id.org/security/suites/ed25519-2020/v1',
  ],
  id: 'http://university.example/credentials/3732',
  type: ['VerifiableCredential', 'ExampleDegreeCredential'],
  issuer: 'https://university.example/issuers/565049',
  validFrom: '2010-01-01T00:00:00Z',
  credentialSubject: {
    id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
    degree: {
      type: 'ExampleBachelorDegree',
      name: 'Bachelor of Science and Arts',
    },
  },
};

const exampleJWTCred =
  'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvdjIiLCJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvZXhhbXBsZXMvdjIiXSwiaWQiOiJodHRwOi8vdW5pdmVyc2l0eS5leGFtcGxlL2NyZWRlbnRpYWxzLzM3MzIiLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRXhhbXBsZURlZ3JlZUNyZWRlbnRpYWwiXSwiaXNzdWVyIjoiaHR0cHM6Ly91bml2ZXJzaXR5LmV4YW1wbGUvaXNzdWVycy81NjUwNDkiLCJ2YWxpZEZyb20iOiIyMDEwLTAxLTAxVDAwOjAwOjAwWiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmV4YW1wbGU6ZWJmZWIxZjcxMmViYzZmMWMyNzZlMTJlYzIxIiwiZGVncmVlIjp7InR5cGUiOiJFeGFtcGxlQmFjaGVsb3JEZWdyZWUiLCJuYW1lIjoiQmFjaGVsb3Igb2YgU2NpZW5jZSBhbmQgQXJ0cyJ9fX0sImlzcyI6Imh0dHBzOi8vdW5pdmVyc2l0eS5leGFtcGxlL2lzc3VlcnMvNTY1MDQ5IiwianRpIjoiaHR0cDovL3VuaXZlcnNpdHkuZXhhbXBsZS9jcmVkZW50aWFscy8zNzMyIiwic3ViIjoiZGlkOmV4YW1wbGU6ZWJmZWIxZjcxMmViYzZmMWMyNzZlMTJlYzIxIn0._r9zLrB2Og2HtnfyYFnfRdlzbqLtGLkc7UfWWcqRoB9vlyUmfsDAAg25bB_CozCQzg4s6jNlgSNVy54EHxDoAg';

const exampleContextMissingJWTCred =
  'eyJ0eXAiOiJhdCtqd3QiLCJhbGciOiJFUzI1NiIsImtpZCI6IjhkYzg2NzE0YWJjNzA5MmQzZTFkMmE2MDBiZmIwODg0In0.eyJ2YyI6eyJpZCI6Imh0dHA6Ly91bml2ZXJzaXR5LmV4YW1wbGUvY3JlZGVudGlhbHMvMzczMiIsInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJFeGFtcGxlRGVncmVlQ3JlZGVudGlhbCJdLCJpc3N1ZXIiOiJodHRwczovL3VuaXZlcnNpdHkuZXhhbXBsZS9pc3N1ZXJzLzU2NTA0OSIsInZhbGlkRnJvbSI6IjIwMTAtMDEtMDFUMDA6MDA6MDBaIiwiY3JlZGVudGlhbFN1YmplY3QiOnsiaWQiOiJkaWQ6ZXhhbXBsZTplYmZlYjFmNzEyZWJjNmYxYzI3NmUxMmVjMjEiLCJkZWdyZWUiOnsidHlwZSI6IkV4YW1wbGVCYWNoZWxvckRlZ3JlZSIsIm5hbWUiOiJCYWNoZWxvciBvZiBTY2llbmNlIGFuZCBBcnRzIn19fSwiaXNzIjoiaHR0cHM6Ly91bml2ZXJzaXR5LmV4YW1wbGUvaXNzdWVycy81NjUwNDkiLCJqdGkiOiJodHRwOi8vdW5pdmVyc2l0eS5leGFtcGxlL2NyZWRlbnRpYWxzLzM3MzIiLCJzdWIiOiJkaWQ6ZXhhbXBsZTplYmZlYjFmNzEyZWJjNmYxYzI3NmUxMmVjMjEifQ.H1MXJ5xldUwF2Y-epS7iR3VtXQkWFzlRZ3Xk0O_7fXErrrZ_nk-UysZSub8w6PwuJPKYFgUc4PbNr21PT--PqQ';

const CONTAINS_NO_DIGIT = /^((?!\d).)*$/;

function copyCredential(cred?: Record<string, unknown>): Record<string, unknown> {
  return { ...(cred ?? exampleCredential) };
}

function typeAndInspect(input: string) {
  cy.visit('/');
  cy.get("[data-testid='inspector-textarea']")
    .should('exist')
    .type(input, { parseSpecialCharSequences: false, delay: 0.01 });
  cy.get("[data-testid='inspect-button']").should('exist').click();
}

describe('Writing credentials to inspect', () => {
  it('shows issuer id when issuer is only string', () => {
    let credential = copyCredential();
    credential.issuer = 'https://university.example/issuers/565049';
    typeAndInspect(JSON.stringify(credential));
    cy.get("[data-testid='issuer-card']").should('exist').contains('https://university.example/issuers/565049');
  });
  it('notifies about missing data when credential subject is not present', () => {
    let credential = copyCredential();
    credential.credentialSubject = undefined;
    typeAndInspect(JSON.stringify(credential));
    cy.get("[data-testid='Credential subject']").should('exist').contains('credentialSubject');
  });
  it('handles jwt credentials', () => {
    typeAndInspect(exampleJWTCred);
    cy.get("[data-testid='valid-from-date']").should('exist').contains('2010');
    cy.get("[data-testid='valid-until-date']").should('exist').contains(CONTAINS_NO_DIGIT);
  });
  it('changes validity dates on standard check from w3c 1.1 to 2.0', () => {
    let credential = copyCredential();
    credential.validFrom = '2010-01-01T00:00:00Z';
    credential.issuanceDate = '2011-01-01T00:00:00Z';
    typeAndInspect(JSON.stringify(credential));
    cy.get("[data-testid='valid-from-date']").should('exist').contains('2010');
    cy.get('button').get("[data-testid='standard-selector']").should('exist').click();
    cy.get("[data-testid='w3c1-option']").click();
    cy.get("[data-testid='valid-from-date']").should('exist').contains('2011');
  });
});
