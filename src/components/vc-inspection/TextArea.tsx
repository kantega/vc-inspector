'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

type TextAreaProps = JSX.IntrinsicElements['textarea'];

const START_HEGHT = 300;

export default function TextArea({ className, ...props }: TextAreaProps) {
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
