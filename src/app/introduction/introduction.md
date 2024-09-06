### User Guide

1. Paste your credential into the "Input" area on the left side.
2. Voilà! Your credential has now been parsed and validated. Like magic, but with more code. You’ll find the result on the right side.

Note: Don’t worry, we’re not spying! We do not record tokens; all validation and debugging is done client-side.

### Features

- Masterful parsing and validation of the encoded credential.
- Inspect, analyze, and debug your credential like a pro detective.
- Present the credential content in a human-readable form – because humans deserve to understand things too!

### Credential Formats Supported

#### JSON-LD

JSON-LD is a lightweight Linked Data format. It is easy for humans to read and write. It is based on the already successful JSON format and provides a way to help JSON data interoperate at Web-scale.

#### JWT

JSON Web Token (JWT) is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.

#### SD-JWT

Selective disclosure JWT is an extension of JWT that allows selective disclosure of specific data elements within a JSON object. Selective disclosure enables a holder to choose which pieces of information contained in a Verifiable Credential will be revealed to a verifier, rather than being forced to reveal all the data present in a Verifiable Credential.

#### CBOR

Concise Binary Object Representation (CBOR) is a data format that aims to provide the benefits of JSON but in a more compact and efficient binary form. Defined in RFC 8949, CBOR's design supports extremely small code sizes, small message sizes, and easy extensibility without version negotiation.

## Feedback

This tool is always evolving. Have any suggestions or want to lend a hand? You're welcome to visit our open-source repository: https://github.com/kantega/vc-inspector.
