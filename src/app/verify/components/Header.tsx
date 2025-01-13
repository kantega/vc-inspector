import React from 'react';

interface HeaderProps {
  data: Record<string, any>;
}

export const Header: React.FC<HeaderProps> = ({ data }) => {
  return (
    <div className="mb-4 rounded-md border p-4">
      <h3 className="mb-2 text-lg font-bold">Header</h3>
      <pre className="overflow-x-auto rounded-md bg-gray-100 p-2 text-sm">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
