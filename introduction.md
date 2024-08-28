# Introduction
Have you stumbled upon a verifiable credential and thought, "What in the world is this thing?"
Or perhaps you're deep in the trenches, crafting your own verifiable credential and need to make sure it checks all the right boxes and plays nice with the standards?

Well then, Poirot is the tool for you! (Yes, we named it after the detective – and yes, it’s just as good at solving credential mysteries!)

## User Guide
1.	Paste your credential into the "Input" area on the left side.
2.	Voilà! Your credential has now been parsed and validated. Like magic, but with more code. You’ll find the result on the right side.
      
Note: Don’t worry, we’re not spying! We do not record tokens; all validation and debugging is done client-side.

## Features
- Masterful parsing and validation of the encoded credential. 
- Inspect, analyze, and debug your credential like a pro detective. 
- Present the credential content in a human-readable form – because humans deserve to understand things too!

## Credential Formats Supported
Poirot supports all the most common credential formats:

### JSON-LD
A JSON-based format that enables the integration of linked data into existing JSON.
### JWT
A compact format for transmitting encoded claims or information between parties.
### SD-JWT
An extension of JWT that allows selective disclosure of specific data elements within a JSON object.
### CBOR
A concise binary format for data serialization designed to be efficient in both size and processing time. Small but mighty!

## Feedback
This tool is always evolving. Have any suggestions or want to lend a hand? You're welcome to visit our open-source repository: https://github.com/kantega/vc-inspector.
