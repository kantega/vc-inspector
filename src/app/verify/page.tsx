'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'

interface FieldConstraint {
  path: string
  filter?: { type: string; pattern?: string; minimum?: number; maximum?: number }
  purpose?: string
  predicate?: "required" | "optional"
}

interface InputDescriptor {
  id: string
  credentialType: string
  proofFormats: string[]
  fields: FieldConstraint[]
}

export default function Page() {
  const [inputDescriptors, setInputDescriptors] = useState<InputDescriptor[]>([])
  const [currentType, setCurrentType] = useState('')
  const [clientId, setClientId] = useState('my-client-id')
  const [redirectUri, setRedirectUri] = useState('https://poirot.id/callback')
  const [responseType, setResponseType] = useState('vp_token')
  const [scope, setScope] = useState('openid')
  const [authorizeUrl, setAuthorizeUrl] = useState('')
  const [unencodedUrl, setUnencodedUrl] = useState('')

  const addInputDescriptor = () => {
    if (currentType) {
      setInputDescriptors([
        ...inputDescriptors,
        { id: `descriptor-${inputDescriptors.length + 1}`, credentialType: currentType, proofFormats: [], fields: [] }
      ])
      setCurrentType('')
    }
  }

  const generatePresentationDefinition = () => {
    return {
      id: "example_presentation_definition",
      input_descriptors: inputDescriptors.map(descriptor => ({
        id: descriptor.id,
        format: descriptor.proofFormats.reduce((formats, format) => {
          formats[format] = { proof_type: ["Ed25519Signature2018", "EcdsaSecp256k1Signature2019"] };
          return formats;
        }, {} as Record<string, any>),
        constraints: {
          limit_disclosure: "required",
          fields: [
            {
              path: ["$.type"],
              filter: { type: "string", pattern: descriptor.credentialType },
            },
            ...descriptor.fields.map(field => ({
              path: [field.path],
              purpose: field.purpose,
              predicate: field.predicate,
              filter: field.filter,
            })),
          ],
        },
      })),
    };
  };

  const updateAuthorizeUrl = () => {
    const presentationDefinition = generatePresentationDefinition();

    // Unencoded URL with line breaks for readability
    const unencoded = `openid4vp://authorize?\nclient_id=${clientId}\nresponse_type=${responseType}\nscope=${scope}\nredirect_uri=${redirectUri}\npresentation_definition=${JSON.stringify(
        presentationDefinition,
        null,
        2
    )}`;
    setUnencodedUrl(unencoded);

    // Encoded URL for proper usage
    const queryParams = new URLSearchParams({
        client_id: clientId,
        response_type: responseType,
        scope,
        redirect_uri: redirectUri,
        presentation_definition: JSON.stringify(presentationDefinition),
    });
    setAuthorizeUrl(`openid4vp://authorize?${queryParams.toString()}`);
};

  // Update the authorize URL whenever inputs change
  useEffect(() => {
    updateAuthorizeUrl()
  }, [clientId, redirectUri, responseType, scope, inputDescriptors])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Presentation Request Builder</h1>

      {/* Two-Column Layout */}
      <div className="flex flex-wrap lg:flex-nowrap">
        {/* Left Column (Input Fields) */}
        <div className="w-full lg:w-1/2 p-4">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="clientId">Client ID:</Label>
              <Input
                id="clientId"
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="Client ID"
              />
              <Label htmlFor="redirectUri" className="mt-2">Redirect URI:</Label>
              <Input
                id="redirectUri"
                type="text"
                value={redirectUri}
                onChange={(e) => setRedirectUri(e.target.value)}
                placeholder="Redirect URI"
              />
              <Label htmlFor="responseType" className="mt-2">Response Type:</Label>
              <Input
                id="responseType"
                type="text"
                value={responseType}
                onChange={(e) => setResponseType(e.target.value)}
                placeholder="Response Type (e.g., vp_token)"
              />
              <Label htmlFor="scope" className="mt-2">Scope:</Label>
              <Input
                id="scope"
                type="text"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                placeholder="Scope (e.g., openid)"
              />
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Input Descriptors</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="text"
                value={currentType}
                onChange={(e) => setCurrentType(e.target.value)}
                placeholder="Credential Type (e.g., BikerCredential)"
              />
              <Button onClick={addInputDescriptor}>Add Descriptor</Button>
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-1/2 p-4">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Generated Authorize URL</CardTitle>
            </CardHeader>
            <CardContent>
            <Label>Encoded URL:</Label>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                {authorizeUrl}
              </pre>
              <Label>QR Code:</Label>
              <div className="flex justify-center mt-4">
                <QRCodeSVG value={authorizeUrl} size={200} />
              </div>
              <Label>Unencoded URL:</Label>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                {unencodedUrl}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}