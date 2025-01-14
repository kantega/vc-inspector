import { parseJwt } from '@/inspector/parsers/jwt';
import React from 'react';

interface PayloadProps {
  data: Record<string, any>;
}

export const Payload: React.FC<PayloadProps> = ({ data }) => {
  const verifiableCredentials = data.vp?.verifiableCredential || [];

  return (
    <div className="mb-4 rounded-md border p-4">
      <h3 className="mb-2 text-lg font-bold">Payload</h3>
      <pre className="overflow-x-auto rounded-md bg-gray-100 p-2 text-sm">{JSON.stringify(data, null, 2)}</pre>

      {verifiableCredentials.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md mb-2 font-semibold">Verifiable Credentials</h4>
          {verifiableCredentials.map((vc: string, index: number) => {
            const { header, payload } = parseJwt(vc);
            return (
              <div key={index} className="mb-4 rounded-md border p-4">
                <h5 className="font-bold">Credential {index + 1}</h5>
                <div className="mt-2">
                  <strong>Header:</strong>
                  <pre className="overflow-x-auto rounded-md bg-gray-100 p-2 text-sm">
                    {JSON.stringify(header, null, 2)}
                  </pre>
                </div>
                <div className="mt-2">
                  <strong>Payload:</strong>
                  <pre className="overflow-x-auto rounded-md bg-gray-100 p-2 text-sm">
                    {JSON.stringify(payload, null, 2)}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
