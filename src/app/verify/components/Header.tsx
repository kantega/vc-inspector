import React from "react";

interface HeaderProps {
  data: Record<string, any>;
}

export const Header: React.FC<HeaderProps> = ({ data }) => {
  return (
    <div className="border rounded-md p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">Header</h3>
      <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};