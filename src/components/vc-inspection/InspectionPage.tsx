'use client';
import inspect, { SuccessfullParse } from '@inspector/inspector';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import ParsedCredentialInfo from './ParsedCredentialInfo';
import { FileType } from 'lucide-react';
import InformationBox from '@/components/notices/InfoBox';
import { cn } from '@/lib/utils';
import NewTextArea from './NewTextArea';

type InspectionPageProps = JSX.IntrinsicElements['div'] & {};

export default function InspectionPage({ className, ...props }: InspectionPageProps) {
  const [value, setValue] = useState('');
  const [inspected, setInspected] = useState<SuccessfullParse | null>();

  useEffect(() => {
    const trimmedValue = value.trim();
    const inspectedResult = inspect(trimmedValue);

    if (inspectedResult.success) {
      setInspected(inspectedResult);
    }
  }, [value]);

  return (
    <div className={cn('sm:w-5/6-mt-6 flex w-full items-center gap-2 transition-all duration-200')}>
      <div className="w-full items-center text-center">
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
        <div className="m-6 flex flex-col gap-6">
          <h1 className="text-3xl font-semibold">Inspect your verifiable credential</h1>
          <InformationBox messageType="neutral" title="Info" className="text-left">
            We do not record tokens, all validation and debugging is done on the client side. Be careful where you paste
            them!
          </InformationBox>
        </div>
        <div className=" w-full">
          <div className="relative flex overflow-hidden rounded-md">
            <NewTextArea
              className="w-full"
              data-testid="inspector-textarea"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </div>
          <div className="border-dark-gray mx-6 mt-4 h-0 border-t-2"></div>
        </div>
      </div>
      <Button className={`bg-dark-purple px-6 `} data-testid="inspect-button">
        Inspect
      </Button>

      <ParsedCredentialInfo inspectedResult={inspected} className="w-11/12" />
      {/* {inspected &&
        inspected.errors.map((error, i) => {
          return (
            <InformationBox key={i} messageType="error" title={error.name} className="w-full">
              <p>{error.message}</p>
            </InformationBox>
          );
        })} */}
    </div>
  );
}
