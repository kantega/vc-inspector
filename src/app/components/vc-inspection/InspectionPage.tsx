'use client';
import inspect, { InspectionResult } from '@inspector/inspector';
import { useEffect, useState } from 'react';
import MinimizingTextArea from '@/components/vc-inspection/MinimizingTextArea';

export default function InspectionPage() {
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
    <main className="flex min-h-screen w-full flex-col items-center p-24">
      <MinimizingTextArea className="w-full md:w-1/2" value={value} onChange={(e) => setValue(e.target.value)} />

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
