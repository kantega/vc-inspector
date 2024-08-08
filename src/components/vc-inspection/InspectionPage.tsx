'use client';
import inspect, { SuccessfullParse } from '@inspector/inspector';
import { useEffect, useState } from 'react';
import ParsedCredentialInfo from './ParsedCredentialInfo';
import { FileType, Share2 } from 'lucide-react';
import InformationBox from '@/components/notices/InfoBox';
import { cn } from '@/lib/utils';
import NewTextArea from './NewTextArea';
import { ReasonedError } from '@/inspector/calculatedAttributes/results';
import { Button } from '../ui/button';
import { useCopyToClipboard } from 'usehooks-ts';

type InspectionPageProps = JSX.IntrinsicElements['div'] & {
  defaultToken?: string;
};

export default function InspectionPage({ className, defaultToken, ...props }: InspectionPageProps) {
  const [, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const [value, setValue] = useState(
    defaultToken ??
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvdjIiLCJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvZXhhbXBsZXMvdjIiXSwiaWQiOiJodHRwOi8vdW5pdmVyc2l0eS5leGFtcGxlL2NyZWRlbnRpYWxzLzM3MzIiLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRXhhbXBsZUR  lZ3JlZUNyZWRlbnRpYWwiXSwiaXNzdWVyIjp7ImlkIjoiaHR0cHM6Ly91bml2ZXJzaXR5LmV4YW1wbGUvaXNzdWVycy81NjUwNDkiLCJuYW1lIjoiRXhhbXBsZSBVbml2ZXJzaXR5IiwiZGVzY3JpcHRpb24iOiJBIHB1YmxpYyB1bml2ZXJzaXR5IGZvY3VzaW5nIG9uIHRlYWNoaW5nIGV4YW1wbGVzLiJ9LCJ2YWxpZEZyb20iOiIyMDE1LTA1LTEwVDEyOjMwOjAwWiIsIm5hbWUiOiJFeGFtcGxlIFVuaXZlcnNpdHkgRGVncmVlIiwiZGVzY3JpcHRpb24iOiIyMDE1IEJhY2hlbG9yIG9mIFNjaWVuY2UgYW5kIEFydHMgRGVncmVlIiwiY3JlZGVudGlhbFN1YmplY3QiOnsiaWQiOiJkaWQ6ZXhhbXBsZTplYmZlYjFmNzEyZWJjNmYxYzI3NmUxMmVjMjEiLCJkZWdyZWUiOnsidHlwZSI6IkV4YW1wbGVCYWNoZWxvckRlZ3JlZSIsIm5hbWUiOiJCYWNoZWxvciBvZiBTY2llbmNlIGFuZCBBcnRzIn19fSwiaXNzIjp7ImlkIjoiaHR0cHM6Ly91bml2ZXJzaXR5LmV4YW1wbGUvaXNzdWVycy81NjUwNDkiLCJuYW1lIjoiRXhhbXBsZSBVbml2ZXJzaXR5IiwiZGVzY3JpcHRpb24iOiJBIHB1YmxpYyB1bml2ZXJzaXR5IGZvY3VzaW5nIG9uIHRlYWNoaW5nIGV4YW1wbGVzLiJ9LCJqdGkiOiJodHRwOi8vdW5pdmVyc2l0eS5leGFtcGxlL2NyZWRlbnRpYWxzLzM3MzIiLCJzdWIiOiJkaWQ6ZXhhbXBsZTplYmZlYjFmNzEyZWJjNmYxYzI3NmUxMmVjMjEifQ.aPeG7A0Qjrh8YItQ08NSbJq0duaY6Z9Lj4XvOeNM0tpGG74DeagauS0WRN0JvCPJ7w2ROKIr9_czX6dCHeKerg',
  );
  const [inspected, setInspected] = useState<SuccessfullParse | null>();
  const [errors, setErrors] = useState<ReasonedError[]>([]);

  useEffect(() => {
    if (value === '') {
      setInspected(null);
      setErrors([]);
      return;
    }
    const trimmedValue = value.trim();
    const inspectedResult = inspect(trimmedValue);

    if (inspectedResult.success) {
      setInspected(inspectedResult);
      setErrors([]);
    } else {
      setErrors(inspectedResult.errors);
      setInspected(null);
    }
  }, [value]);

  useEffect(() => {
    const inspectedResult = inspect(value);

    if (inspectedResult.success) {
      setInspected(inspectedResult);
      setErrors([]);
    } else {
      setErrors(inspectedResult.errors);
      setInspected(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      {...props}
      className={cn(
        'sm:w-5/6-mt-6 relative flex min-h-screen w-full flex-col gap-2 transition-all duration-200 sm:flex-row',
      )}
    >
      {/* todo: fix sticky maybe */}
      <div className="w-full sm:w-1/2">
        <div className="flex w-full justify-between gap-2 p-3">
          <p className="text-xl">Verifiable Credential</p>
          {value !== '' && (
            <Button
              className="gap-2"
              onClick={() => {
                const shareUrl = `${window.location.origin}${window.location.pathname}#vc-debugger?token=${value}`;
                copyToClipboard(shareUrl);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            >
              {copied && <>Copied</>}
              {!copied && (
                <>
                  <Share2 />
                  Share VC
                </>
              )}
            </Button>
          )}
          {inspected?.success && (
            <>
              <div className="flex items-center">
                <FileType size="1.2em" />
                <span className="ml-1">Format: </span>
                <span className="ml-1.5 rounded bg-light-gray p-0.5">{inspected.parsedJson.type}</span>
              </div>
            </>
          )}
        </div>
        <div className="m-6 flex flex-col gap-6">
          <h1 className="flex text-3xl font-semibold">
            Inspect your verifiable credential
            <InformationBox messageType="neutral" title="" className="text-left">
              We do not record tokens, all validation and debugging is done on the client side. Be careful where you
              paste them!
            </InformationBox>
          </h1>
        </div>
        <div className=" w-full">
          <div className="relative flex overflow-hidden rounded-md">
            <NewTextArea
              className={'w-full' + (errors.length > 0 ? ' bg-red-200' : '')}
              data-testid="inspector-textarea"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </div>
          <div className="mx-6 mt-4 h-0 border-t-2 border-dark-gray"></div>
        </div>
      </div>

      <div className="flex w-1/2 flex-col">
        <div className="flex w-full flex-wrap gap-4">
          {errors.map((error, i) => {
            return (
              <InformationBox key={i} messageType="error" title={error.name} className=" w-full">
                <p>{error.message}</p>
              </InformationBox>
            );
          })}
        </div>
        <ParsedCredentialInfo inspectedResult={inspected} className="flex w-full flex-col gap-2" />
      </div>
    </div>
  );
}
