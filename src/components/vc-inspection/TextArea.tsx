import { cn } from '@/lib/utils';
import { useCopyToClipboard } from 'usehooks-ts';
import CopyButton from '../data-lists/CopyButton';
import ClearButton from '../data-lists/ClearButton';
import { ChangeEvent, TextareaHTMLAttributes } from 'react';

export default function TextArea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [, copyToClipboard] = useCopyToClipboard();

  return (
    <div className="relative h-full w-full">
      {props.value !== '' && (
        <>
          <CopyButton onClick={() => copyToClipboard(props.value ? props.value.toString() : '')} />
          <ClearButton
            onClick={() =>
              props.onChange ? props.onChange({ target: { value: '' } } as ChangeEvent<HTMLTextAreaElement>) : null
            }
          />
        </>
      )}
      <textarea
        {...props}
        aria-label="Verifiable Credential Text Area"
        spellCheck={false}
        placeholder="Paste your verifiable credential here"
        className={cn('h-[50vh] rounded-md bg-light-gray p-4 placeholder-readable-gray', className)}
      />
    </div>
  );
}
