'use client';
import inspect, { InspectionResult } from '@inspector/inspector';
import { useEffect, useState } from 'react';
import MinimizingTextArea from '@/components/vc-inspection/MinimizingTextArea';
import { Button } from '@/components/shadcn/button';
import ParsedCredentialInfo from './ParsedCredentialInfo';

export default function InspectionPage() {
  const [value, setValue] = useState('');
  const [inspected, setInspected] = useState<InspectionResult | null>();
  const [textAreaStatus, setTextAreaStatus] = useState<'active-button' | 'min' | 'active'>('active');
  const [afterFirstInspection, setAfterFirstInspection] = useState(false);

  useEffect(() => {
    if (!value || (!inspected && textAreaStatus !== 'min')) {
      setInspected(null);
      return;
    }

    const inspectedResult = inspect(value);
    console.log(inspectedResult);
    setInspected(inspectedResult);
  }, [textAreaStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-5">
      <MinimizingTextArea
        className="w-full"
        onKeyDown={(e) => {
          if (e.code == 'Tab') {
            setValue(value + '  ');
            e.preventDefault();
          }
        }}
        value={value}
        onChange={(e) => {
          setTextAreaStatus('active-button');
          setValue(e.target.value);
        }}
        onMinimizationChange={(m) => {
          setTextAreaStatus(m ? 'min' : textAreaStatus === 'active' ? 'active' : 'active-button');
          setAfterFirstInspection(true);
        }}
        requestMinimizationTo={textAreaStatus === 'min'}
      />

      <Button
        className={`bg-dark-purple px-6 ${textAreaStatus != 'active-button' && 'hidden'}`}
        onClick={() => setTextAreaStatus('min')}
      >
        Inspect
      </Button>

      {inspected && (
        <>
          {inspected.type != 'ParseError' && afterFirstInspection && (
            <ParsedCredentialInfo inspectedResult={inspected} />
          )}
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
          {inspected.type === 'ParseError' && (
            <>
              {inspected.errors.map((error, i) => {
                return (
                  <p key={i} className="text-red-800">
                    {error.message}
                  </p>
                );
              })}
            </>
          )}
          {inspected.type === 'ValidCredential' && <p className="text-green-800">Valid Credential</p>}
        </>
      )}
    </div>
  );
}
