'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useBaseUrl } from './hooks/useBaseUrl';
import { Presentation } from 'lucide-react';
import PresentationResult from './components/PresentationResult';

interface FieldConstraint {
  path: string;
  filter?: { type: string; pattern?: string; minimum?: number; maximum?: number };
  purpose?: string;
  predicate?: 'required' | 'optional';
}

interface InputDescriptor {
  id: string;
  credentialType: string;
  proofFormats: string[];
  fields: FieldConstraint[];
}

const clientMetadata = {
  client_name: 'Your Organization',
  description: 'This service requests your verifiable credentials for authentication purposes.',
  logo_uri: 'https://png.pngtree.com/png-vector/20211023/ourmid/pngtree-salon-logo-png-image_4004444.png',
  location: 'City, Country',
  cover_uri: 'https://png.pngtree.com/png-vector/20211023/ourmid/pngtree-salon-logo-png-image_4004444.png',
};

// make array of all types Wallet in a cool typescript way
const wallets = ['iGrant', 'Lomino', 'Other'] as const;

type Wallet = (typeof wallets)[number];

export default function Page() {
  const baseUrl = useBaseUrl();

  const [pollData, setPollData] = useState<boolean>(false);
  const [selectedWallet, setSelectedWallet] = useState<Wallet>('Lomino');
  const [inputDescriptors, setInputDescriptors] = useState<InputDescriptor[]>([]);
  const [currentType, setCurrentType] = useState('');
  const [clientId, setClientId] = useState(baseUrl);
  const [audience, setAudience] = useState(baseUrl);
  const [responseUri, setResponseUri] = useState(baseUrl + '/api/callback');
  const [responseType, setResponseType] = useState('vp_token');
  const [responseMode, setResponseMode] = useState('direct_post');
  const [scope, setScope] = useState('openid');
  const [nonce, setNonce] = useState(uuidv4());
  const [state, setState] = useState(uuidv4());
  const [authorizeUrl, setAuthorizeUrl] = useState('');
  const [unencodedUrl, setUnencodedUrl] = useState('');

  useEffect(() => {
    setClientId(baseUrl);
    setAudience(baseUrl);
    setResponseUri(baseUrl + '/api/callback');
  }, [baseUrl]);

  const addInputDescriptor = () => {
    if (currentType) {
      setInputDescriptors([
        ...inputDescriptors,
        { id: uuidv4(), credentialType: currentType, proofFormats: [], fields: [] },
      ]);
      setCurrentType('');
    }
  };

  const generatePresentationDefinition = () => {
    return {
      id: uuidv4(),
      format: {
        // "vc+sd-jwt": {
        //   alg: ["ES256"] // Add the desired algorithms
        // },
        // "vp+sd-jwt": {
        //   alg: ["ES256"] // Add the desired algorithms
        // },
        jwt_vc: {
          alg: ['ES256'], // Add the desired algorithms
        },
      },
      input_descriptors: inputDescriptors.map((descriptor) => ({
        id: descriptor.id,
        format: descriptor.proofFormats.reduce(
          (formats, format) => {
            formats[format] = { proof_type: ['Ed25519Signature2018', 'EcdsaSecp256k1Signature2019'] };
            return formats;
          },
          {} as Record<string, any>,
        ),
        constraints: {
          limit_disclosure: 'required',
          fields: [
            selectedWallet === 'Lomino'
              ? {
                  path: ['$.vc.type'],
                  filter: {
                    type: 'string',
                    pattern: `^${descriptor.credentialType}$`,
                  },
                }
              : selectedWallet === 'iGrant'
                ? {
                    path: ['$.vc.type'],
                    filter: {
                      type: 'array',
                      contains: {
                        const: descriptor.credentialType,
                      },
                    },
                  }
                : {
                    // Default or fallback for "Other"
                    path: ['$.vc.type'],
                    filter: {
                      type: 'string',
                    },
                  },
            ...descriptor.fields.map((field) => ({
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

    const payload = {
      aud: audience,
      client_id: clientId,
      client_id_scheme: 'redirect_uri',
      exp: Math.floor(Date.now() / 1000) + 3600,
      iss: clientId,
      nonce,
      presentation_definition: presentationDefinition,
      response_mode: responseMode,
      response_type: responseType,
      response_uri: responseUri,
      scope,
      state,
      client_metadata: clientMetadata,
    };

    const unencoded = JSON.stringify(payload, null, 2);
    setUnencodedUrl(unencoded);

    const encoded = `openid4vp://authorize?${new URLSearchParams({
      aud: payload.aud,
      client_id: payload.client_id,
      response_type: payload.response_type,
      scope: payload.scope,
      nonce: payload.nonce,
      state: payload.state,
      presentation_definition: JSON.stringify(payload.presentation_definition),
      response_uri: payload.response_uri,
      response_mode: payload.response_mode,
      client_metadata: JSON.stringify(payload.client_metadata),
    }).toString()}`;

    setAuthorizeUrl(encoded);
  };

  useEffect(() => {
    updateAuthorizeUrl();
  }, [
    baseUrl,
    clientId,
    audience,
    responseUri,
    responseType,
    responseMode,
    scope,
    nonce,
    state,
    inputDescriptors,
    wallets,
    selectedWallet,
  ]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold text-white">Presentation Request Builder</h1>

      {/* Two-Column Layout */}
      <div className="flex flex-wrap lg:flex-nowrap">
        {/* Left Column (Input Fields) */}
        <div className="w-full p-4 lg:w-1/2">
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
              <Label htmlFor="audience" className="mt-2">
                Audience:
              </Label>
              <Input
                id="audience"
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="Audience"
              />
              <Label htmlFor="responseUri" className="mt-2">
                Response URI:
              </Label>
              <Input
                id="responseUri"
                type="text"
                value={responseUri}
                onChange={(e) => setResponseUri(e.target.value)}
                placeholder="Response URI"
              />
              <Label htmlFor="responseMode" className="mt-2">
                Response Mode:
              </Label>
              <Input
                id="responseMode"
                type="text"
                value={responseMode}
                onChange={(e) => setResponseMode(e.target.value)}
                placeholder="Response Mode (e.g., direct_post)"
              />
              <Label htmlFor="wallet" className="mt-2">
                Wallet:
              </Label>
              <div className="flex gap-4">
                {wallets.map((wallet) => (
                  <div
                    key={wallet}
                    className={`cursor-pointer rounded-lg border ${
                      selectedWallet === wallet ? 'border-blue-500' : 'border-gray-300'
                    } px-4 py-2 text-center transition hover:shadow-md`}
                    onClick={() => setSelectedWallet(wallet)}
                  >
                    <span className="font-semibold">{wallet}</span>
                  </div>
                ))}
              </div>
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

          {pollData && <PresentationResult state={state} />}
        </div>

        <div className="w-full p-4 lg:w-1/2">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Generated Authorize URL</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Poll Presentation Data</Label>
              <div>
                <input type="checkbox" checked={pollData} onChange={() => setPollData(!pollData)} />
              </div>
              <Label>Encoded URL:</Label>
              <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">{authorizeUrl}</pre>
              <Label>QR Code:</Label>
              <div className="mt-4 flex justify-center">
                <QRCodeSVG value={authorizeUrl} size={400} />
              </div>
              <Label>Unencoded URL:</Label>
              <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">{unencodedUrl}</pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
