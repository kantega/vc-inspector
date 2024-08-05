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
  const [value, setValue] = useState(
    'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvdjIiLCJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvZXhhbXBsZXMvdjIiXSwiaWQiOiJodHRwOi8vdW5pdmVyc2l0eS5leGFtcGxlL2NyZWRlbnRpYWxzLzM3MzIiLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRXhhbXBsZUR  lZ3JlZUNyZWRlbnRpYWwiXSwiaXNzdWVyIjp7ImlkIjoiaHR0cHM6Ly91bml2ZXJzaXR5LmV4YW1wbGUvaXNzdWVycy81NjUwNDkiLCJuYW1lIjoiRXhhbXBsZSBVbml2ZXJzaXR5IiwiZGVzY3JpcHRpb24iOiJBIHB1YmxpYyB1bml2ZXJzaXR5IGZvY3VzaW5nIG9uIHRlYWNoaW5nIGV4YW1wbGVzLiJ9LCJ2YWxpZEZyb20iOiIyMDE1LTA1LTEwVDEyOjMwOjAwWiIsIm5hbWUiOiJFeGFtcGxlIFVuaXZlcnNpdHkgRGVncmVlIiwiZGVzY3JpcHRpb24iOiIyMDE1IEJhY2hlbG9yIG9mIFNjaWVuY2UgYW5kIEFydHMgRGVncmVlIiwiY3JlZGVudGlhbFN1YmplY3QiOnsiaWQiOiJkaWQ6ZXhhbXBsZTplYmZlYjFmNzEyZWJjNmYxYzI3NmUxMmVjMjEiLCJkZWdyZWUiOnsidHlwZSI6IkV4YW1wbGVCYWNoZWxvckRlZ3JlZSIsIm5hbWUiOiJCYWNoZWxvciBvZiBTY2llbmNlIGFuZCBBcnRzIn19fSwiaXNzIjp7ImlkIjoiaHR0cHM6Ly91bml2ZXJzaXR5LmV4YW1wbGUvaXNzdWVycy81NjUwNDkiLCJuYW1lIjoiRXhhbXBsZSBVbml2ZXJzaXR5IiwiZGVzY3JpcHRpb24iOiJBIHB1YmxpYyB1bml2ZXJzaXR5IGZvY3VzaW5nIG9uIHRlYWNoaW5nIGV4YW1wbGVzLiJ9LCJqdGkiOiJodHRwOi8vdW5pdmVyc2l0eS5leGFtcGxlL2NyZWRlbnRpYWxzLzM3MzIiLCJzdWIiOiJkaWQ6ZXhhbXBsZTplYmZlYjFmNzEyZWJjNmYxYzI3NmUxMmVjMjEifQ.aPeG7A0Qjrh8YItQ08NSbJq0duaY6Z9Lj4XvOeNM0tpGG74DeagauS0WRN0JvCPJ7w2ROKIr9_czX6dCHeKerg',
  );
  const [inspected, setInspected] = useState<SuccessfullParse | null>();

  useEffect(() => {
    const trimmedValue = value.trim();
    const inspectedResult = inspect(trimmedValue);

    if (inspectedResult.success) {
      setInspected(inspectedResult);
    }
  }, [value]);

  useEffect(() => {
    const inspectedResult = inspect(value);

    if (inspectedResult.success) {
      setInspected(inspectedResult);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn('sm:w-5/6-mt-6 relative flex min-h-screen w-full gap-2 transition-all duration-200')}>
      {/* todo: fix sticky maybe */}
      <div className=" w-1/2">
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

      <ParsedCredentialInfo inspectedResult={inspected} className="flex w-1/2 flex-col gap-2" />
      {/* {inspected && inspected.errors && inspected.error.length > 0 &&
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
