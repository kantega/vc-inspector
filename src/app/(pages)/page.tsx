'use client';
import inspect, { InspectionResult } from '@/inspector/inspector';
import { useEffect, useState } from 'react';

export default function Home() {
  // Proof of concept for the inspector

  const [value, setValue] = useState('');
  const [inspected, setInspected] = useState<InspectionResult | null>();

  useEffect(() => {
    if (!value) {
      setInspected(null);
      return;
    }

    const inspected = inspect(value);
    setInspected(inspected);
    console.log(inspected);
  }, [value]);

  return (
    <main className="flex min-h-screen w-screen flex-col items-center p-24">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Paste your verifiable credential here"
        className={`w-1/2 rounded-md bg-gray-200 p-4 `}
      ></textarea>

      {inspected && (
        <>
          {inspected.type === 'InvalidCredential' && (
            <>
              {inspected.error.issues.map((issue, i) => {
                return (
                  <p key={i} className="text-red-800">
                    {issue.fatal}
                    {issue.path.join(' -> ')}: {issue.message}
                  </p>
                );
              })}
            </>
          )}
          {inspected.type === 'ParseError' && <p className="text-red-800">{inspected.error.message}</p>}
          {inspected.type === 'ValidCredential' && <p className="text-green-800">Valid Credential</p>}
        </>
      )}
    </main>
  );
}
