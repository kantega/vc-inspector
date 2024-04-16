'use client';
import inspect, { InspectionResult } from '@inspector/inspector';
import { useEffect, useMemo, useState } from 'react';
import MinimizingTextArea from '@/components/vc-inspection/MinimizingTextArea';
import { Button } from '@/components/shadcn/button';
import ParsedCredentialInfo from './ParsedCredentialInfo';
import { cn } from '@/utils/styling';
import { FileType } from 'lucide-react';

export default function InspectionPage() {
  const [value, setValue] = useState('');
  const [inspected, setInspected] = useState<InspectionResult | null>();
  const [textAreaStatus, setTextAreaStatus] = useState<'active-button' | 'min' | 'active'>('active');
  const [afterFirstInspection, setAfterFirstInspection] = useState(false);

  const onceSuccessfullyParsed = useMemo(
    () => textAreaStatus !== 'active' && inspected?.type !== 'ParseError',
    [textAreaStatus, inspected],
  );

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
    <div
      className={cn(
        'flex min-h-screen w-5/6 flex-col items-center gap-5 transition-all duration-200',
        onceSuccessfullyParsed && '-mt-20',
      )}
    >
      <div className="w-full items-center text-center">
        {onceSuccessfullyParsed ? (
          <div className="flex w-full justify-between gap-2 p-3">
            <p>Verifiable Credential</p>
            <span className="flex">
              <FileType />
              <p>JWT-VC</p>
            </span>
          </div>
        ) : (
          <h1 className="m-4 text-3xl font-semibold">Inspect your verifiable credential</h1>
        )}
        <div className="w-full">
          <MinimizingTextArea
            className="w-full"
            data-testid="inspector-textarea"
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
          <div className="mx-6 mt-4 h-0 border-t-2 border-dark-gray"></div>
        </div>
      </div>
      <Button
        className={`bg-dark-purple px-6 ${textAreaStatus != 'active-button' && 'hidden'}`}
        onClick={() => setTextAreaStatus('min')}
        data-testid="inspect-button"
      >
        Inspect
      </Button>

      {inspected && (
        <>
          {inspected.type != 'ParseError' && afterFirstInspection && (
            <ParsedCredentialInfo inspectedResult={inspected} />
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
        </>
      )}
    </div>
  );
}
