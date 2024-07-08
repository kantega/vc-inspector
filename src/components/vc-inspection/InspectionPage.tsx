'use client';
import inspect, { InspectionResult } from '@inspector/inspector';
import { useEffect, useMemo, useState } from 'react';
import MinimizingTextArea from '@/components/vc-inspection/MinimizingTextArea';
import { Button } from '@/components/shadcn/button';
import ParsedCredentialInfo from './ParsedCredentialInfo';
import { cn } from '@/utils/styling';
import { FileType, Pencil } from 'lucide-react';
import InformationBox from '@/components/notices/InfoBox';

type InspectionPageProps = JSX.IntrinsicElements['div'] & {};

export default function InspectionPage({ className, ...props }: InspectionPageProps) {
  const [value, setValue] = useState('');
  const [inspected, setInspected] = useState<InspectionResult | null>();
  const [textAreaStatus, setTextAreaStatus] = useState<'active-button' | 'min' | 'active'>('active');
  const [afterFirstInspection, setAfterFirstInspection] = useState(false);

  const onceSuccessfullyParsed = useMemo(
    () => afterFirstInspection && inspected?.success,
    [afterFirstInspection, inspected],
  );

  useEffect(() => {
    if (!value || (!inspected && textAreaStatus !== 'min')) {
      setInspected(null);
      return;
    }

    const trimmedValue = value.trim();
    const inspectedResult = inspect(trimmedValue);

    console.log(inspectedResult);
    setInspected(inspectedResult);
  }, [textAreaStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center gap-2 transition-all duration-200 sm:w-5/6',
        onceSuccessfullyParsed && '-mt-6',
      )}
    >
      <div className="w-full items-center text-center">
        {onceSuccessfullyParsed ? (
          <div className="flex w-full justify-between gap-2 p-3">
            <p className="text-xl">Verifiable Credential</p>
            {inspected?.success && (
              <>
                <div className="flex items-center">
                  <FileType size="1.2em" />
                  <span className="ml-1">Format: </span>
                  <span className="bg-light-gray ml-1.5 rounded p-0.5">{inspected.parsedJson.type}</span>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="m-6 flex flex-col gap-6">
            <h1 className="text-3xl font-semibold">Inspect your verifiable credential</h1>
            <InformationBox messageType="neutral" title="Info" className="text-left">
              We do not record tokens, all validation and debugging is done on the client side. Be careful where you
              paste them!
            </InformationBox>
          </div>
        )}
        <div className=" w-full">
          <div className="relative flex overflow-hidden rounded-md">
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
                if (m) setAfterFirstInspection(true);
              }}
              requestMinimizationTo={textAreaStatus === 'min'}
            />
            {textAreaStatus === 'min' && (
              <button
                onClick={() => setTextAreaStatus('active-button')}
                className="border-readable-gray bg-light-gray text-readable-gray absolute right-0 top-0 flex h-full w-12 items-center justify-center"
                aria-label="Edit"
              >
                <div className="border-readable-gray border-l-2 pl-2">
                  <Pencil className="h-5" />
                </div>
              </button>
            )}
          </div>
          <div className="border-dark-gray mx-6 mt-4 h-0 border-t-2"></div>
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
          {inspected.success && afterFirstInspection && (
            <ParsedCredentialInfo inspectedResult={inspected} className="w-11/12" />
          )}
          {!inspected.success && (
            <>
              {inspected.errors.map((error, i) => {
                return (
                  <InformationBox key={i} messageType="error" title={error.name} className="w-full">
                    <p>{error.message}</p>
                  </InformationBox>
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
}
