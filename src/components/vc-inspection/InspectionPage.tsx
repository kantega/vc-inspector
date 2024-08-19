'use client';
import inspect, { SuccessfullParse } from '@inspector/inspector';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ParsedCredentialInfo from './ParsedCredentialInfo';
import { FileType, Lock, Share2, Unlock, Upload } from 'lucide-react';
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
    <div className="overflow bg-green-200-hidden flex flex-col rounded-xl bg-light-purple">
      <UpperSection {...{ value, copyToClipboard, setCopied, copied }} />
      <div
        {...props}
        className={cn(
          'sm:w-5/6-mt-6 relative flex min-h-screen w-full flex-col gap-2 bg-white p-2 transition-all duration-200 sm:flex-row',
        )}
      >
        <EncodedPart {...{ inspected, errors, value, setValue }} />
        <DecodedPart {...{ errors, inspected }} />
      </div>
    </div>
  );
}

function EncodedPart({
  inspected,
  errors,
  value,
  setValue,
}: {
  inspected: SuccessfullParse | null | undefined;
  errors: ReasonedError[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  const [, copyToClipboard] = useCopyToClipboard();

  return (
    <div className="w-full sm:w-1/2">
      <h1 className="my-4 flex items-center gap-2 text-2xl font-bold">
        <Lock />
        Encoded
      </h1>
      <p className="my-2 flex items-center gap-2 text-sm text-green-500">
        <span className="h-3 w-3 rounded-full border-2 border-green-500" />
        INPUT
      </p>
      <div>
        <div className="flex w-full justify-between gap-2 rounded-t border-l-2 border-r-2 border-t-2 p-1 px-2">
          {inspected?.success ? (
            <>
              <div className="flex items-center">
                <FileType size="1.2em" />
                <span className="ml-1">Format: </span>
                <span className="ml-1.5 rounded bg-light-gray p-0.5">{inspected.parsedJson.type}</span>
              </div>
            </>
          ) : (
            <div></div>
          )}
          <div className="">
            <Button variant="link" onClick={() => setValue('')}>
              Clear
            </Button>
            <Button variant="link" onClick={() => copyToClipboard(value)}>
              Copy
            </Button>
          </div>
        </div>
        <div className=" w-full">
          <div className="relative flex overflow-hidden rounded-md">
            <NewTextArea
              className={cn(
                'w-full resize-none border-l-8 bg-light-purple',
                errors.length > 0 ? 'border-red-400 bg-red-200' : 'border-green-200',
              )}
              data-testid="inspector-textarea"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DecodedPart({
  errors,
  inspected,
}: {
  errors: ReasonedError[];
  inspected: SuccessfullParse | null | undefined;
}) {
  return (
    <div className="flex w-1/2 flex-col">
      <div className="flex flex-col">
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

function UpperSection({
  value,
  copyToClipboard,
  setCopied,
  copied,
}: {
  value: string;
  copyToClipboard: (text: string) => Promise<boolean>;
  setCopied: Dispatch<SetStateAction<boolean>>;
  copied: boolean;
}) {
  return (
    <div className="flex h-20 w-full items-center justify-between border-b-2 border-dashed border-purple-kantega-600 px-10">
      <h1 className="text-3xl"> Verifiable Credential</h1>
      {value !== '' && (
        <Button
          className="gap-2 rounded-xl bg-violet-kantega-900 font-normal"
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
              <Upload className="w-4" />
              Share Current Credential
            </>
          )}
        </Button>
      )}
    </div>
  );
}
