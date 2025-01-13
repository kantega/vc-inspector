import { parseJwt } from "@/inspector/parsers/jwt";
import React from "react";

interface PayloadProps {
  data: Record<string, any>;
}

export const Payload: React.FC<PayloadProps> = ({ data }) => {
  const verifiableCredentials = data.vp?.verifiableCredential || [];

  return (
    <div className="border rounded-md p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">Payload</h3>
      <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>

      {verifiableCredentials.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md font-semibold mb-2">Verifiable Credentials</h4>
          {verifiableCredentials.map((vc: string, index: number) => {
            const { header, payload } = parseJwt(vc);
            return (
              <div key={index} className="border rounded-md p-4 mb-4">
                <h5 className="font-bold">Credential {index + 1}</h5>
                <div className="mt-2">
                  <strong>Header:</strong>
                  <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(header, null, 2)}
                  </pre>
                </div>
                <div className="mt-2">
                  <strong>Payload:</strong>
                  <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto text-sm">
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