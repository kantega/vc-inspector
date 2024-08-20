'use client';

import { cn } from '@/lib/utils';

export default function TextArea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      aria-label="Verifiable Credential Text Area"
      spellCheck={false}
      placeholder="Paste your verifiable credential here"
      className={cn('h-[50vh] rounded-md bg-light-gray p-4 placeholder-readable-gray', className)}
    />
  );
}
