import React from 'react';
import { Payload } from './Payload';
import { Header } from './Header';
import { parseJwt } from '@/inspector/parsers/jwt';

interface JwtViewerProps {
  jwt: string;
}

const JwtViewer: React.FC<JwtViewerProps> = ({ jwt }) => {
  const { header, payload } = parseJwt(jwt);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">JWT Viewer</h1>
      <Header data={header} />
      <Payload data={payload} />
    </div>
  );
};

export default JwtViewer;
