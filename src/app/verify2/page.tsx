'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';

interface FieldConstraint {
  path: string;
  filter?: { type: string; pattern?: string; minimum?: number; maximum?: number };
  purpose?: string;
  predicate?: 'required' | 'preferred';
}

interface InputDescriptor {
  id: string;
  name: string;
  purpose: string;
  credentialType: string;
  proofFormats: string[];
  fields: FieldConstraint[];
}

export default function AdvancedPresentationDefinitionBuilder() {
  const [inputDescriptors, setInputDescriptors] = useState<InputDescriptor[]>([]);
  const [currentType, setCurrentType] = useState('');
  const [clientId, setClientId] = useState('my-client-id');
  const [redirectUri, setRedirectUri] = useState('https://poirot.id/callback');
  const [responseType, setResponseType] = useState('vp_token');
  const [scope, setScope] = useState('openid');
  const [authorizeUrl, setAuthorizeUrl] = useState('');
  const [unencodedUrl, setUnencodedUrl] = useState('');
  const [currentDescriptor, setCurrentDescriptor] = useState<InputDescriptor>({
    id: '',
    name: '',
    purpose: '',
    credentialType: '',
    proofFormats: [],
    fields: [],
  });
  const [currentField, setCurrentField] = useState<FieldConstraint>({
    path: '',
    purpose: '',
    predicate: 'required',
    filter: { type: 'string' },
  });
  const [error, setError] = useState<string | null>(null);

  const addInputDescriptor = () => {
    if (currentDescriptor.credentialType && currentDescriptor.name) {
      setInputDescriptors([
        ...inputDescriptors,
        {
          ...currentDescriptor,
          id: `descriptor-${inputDescriptors.length + 1}`,
        },
      ]);
      setCurrentDescriptor({
        id: '',
        name: '',
        purpose: '',
        credentialType: '',
        proofFormats: [],
        fields: [],
      });
      setError(null);
    } else {
      setError('Credential Type and Name are required for the Input Descriptor.');
    }
  };

  const addField = () => {
    if (currentField.path) {
      setCurrentDescriptor((prev) => ({
        ...prev,
        fields: [...prev.fields, { ...currentField, path: `$.credentialSubject.${currentField.path}` }],
      }));
      setCurrentField({
        path: '',
        purpose: '',
        predicate: 'required',
        filter: { type: 'string' },
      });
      setError(null);
    } else {
      setError('Field Path is required.');
    }
  };

  const addProofFormat = (format: string) => {
    if (!currentDescriptor.proofFormats.includes(format)) {
      setCurrentDescriptor((prev) => ({
        ...prev,
        proofFormats: [...prev.proofFormats, format],
      }));
    }
  };

  const removeProofFormat = (format: string) => {
    setCurrentDescriptor((prev) => ({
      ...prev,
      proofFormats: prev.proofFormats.filter((f) => f !== format),
    }));
  };

  const generatePresentationDefinition = () => {
    const definition = {
      id: 'advanced_presentation_definition',
      input_descriptors: inputDescriptors.map((descriptor) => ({
        id: descriptor.id,
        name: descriptor.name,
        purpose: descriptor.purpose,
        format: descriptor.proofFormats.reduce(
          (formats, format) => {
            formats[format] = { proof_type: ['Ed25519Signature2018', 'EcdsaSecp256k1Signature2019'] };
            return formats;
          },
          {} as Record<string, any>,
        ),
        constraints: {
          fields: descriptor.fields.map((field) => ({
            path: [field.path],
            purpose: field.purpose,
            predicate: field.predicate,
            filter: field.filter,
          })),
        },
      })),
    };
    return JSON.stringify(definition, null, 2);
  };

  useEffect(() => {
    updateAuthorizeUrl();
  }, [clientId, redirectUri, responseType, scope, inputDescriptors]);

  const updateAuthorizeUrl = () => {
    const presentationDefinition = generatePresentationDefinition();

    const unencoded = `openid4vp://authorize?\nclient_id=${clientId}\nresponse_type=${responseType}\nscope=${scope}\nredirect_uri=${redirectUri}\npresentation_definition=${JSON.stringify(
      presentationDefinition,
      null,
      2,
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Advanced Presentation Definition Builder</h1>

      <Tabs defaultValue="descriptor" className="space-y-4">
        <TabsList>
          <TabsTrigger value="descriptor">Input Descriptor</TabsTrigger>
          <TabsTrigger value="fields">Fields</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="descriptor">
          <Card>
            <CardHeader>
              <CardTitle>Input Descriptor Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="credentialType">Credential Type</Label>
                  <Input
                    id="credentialType"
                    value={currentDescriptor.credentialType}
                    onChange={(e) => setCurrentDescriptor((prev) => ({ ...prev, credentialType: e.target.value }))}
                    placeholder="e.g., BikerCredential"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={currentDescriptor.name}
                    onChange={(e) => setCurrentDescriptor((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Biker ID"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="purpose">Purpose</Label>
                <Input
                  id="purpose"
                  value={currentDescriptor.purpose}
                  onChange={(e) => setCurrentDescriptor((prev) => ({ ...prev, purpose: e.target.value }))}
                  placeholder="e.g., Verify biker status"
                />
              </div>
              <div>
                <Label>Proof Formats</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['jwt_vc', 'ldp_vc', 'jwt_vp', 'ldp_vp'].map((format) => (
                    <Button
                      key={format}
                      variant={currentDescriptor.proofFormats.includes(format) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() =>
                        currentDescriptor.proofFormats.includes(format)
                          ? removeProofFormat(format)
                          : addProofFormat(format)
                      }
                    >
                      {format}
                    </Button>
                  ))}
                </div>
              </div>
              <Button onClick={addInputDescriptor}>Add Input Descriptor</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fields">
          <Card>
            <CardHeader>
              <CardTitle>Field Constraints</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fieldPath">Field Path</Label>
                <Input
                  id="fieldPath"
                  value={currentField.path}
                  onChange={(e) => setCurrentField((prev) => ({ ...prev, path: e.target.value }))}
                  placeholder="e.g., name"
                />
              </div>
              <div>
                <Label htmlFor="fieldPurpose">Purpose</Label>
                <Input
                  id="fieldPurpose"
                  value={currentField.purpose}
                  onChange={(e) => setCurrentField((prev) => ({ ...prev, purpose: e.target.value }))}
                  placeholder="e.g., Verify name"
                />
              </div>
              <div>
                <Label htmlFor="fieldPredicate">Predicate</Label>
                <Select
                  value={currentField.predicate}
                  onValueChange={(value: 'required' | 'preferred') =>
                    setCurrentField((prev) => ({ ...prev, predicate: value }))
                  }
                >
                  <SelectTrigger id="fieldPredicate">
                    <SelectValue placeholder="Select predicate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="required">Required</SelectItem>
                    <SelectItem value="preferred">Preferred</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addField}>Add Field</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {inputDescriptors.length > 0 ? (
                <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">{generatePresentationDefinition()}</pre>
              ) : (
                <p>No input descriptors added yet.</p>
              )}
              <CardHeader>
                <CardTitle>Generated Authorize URL</CardTitle>
              </CardHeader>
              <CardContent>
                <Label>Encoded URL:</Label>
                <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">{authorizeUrl}</pre>
                <Label>QR Code:</Label>
                <div className="mt-4 flex justify-center">
                  <QRCodeSVG value={authorizeUrl} size={200} />
                </div>
                <Label>Unencoded URL:</Label>
                <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">{unencodedUrl}</pre>
              </CardContent>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
