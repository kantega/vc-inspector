'use client';

import { cn } from '@/utils/styling';
import { useRef, useState } from 'react';

type TextAreaProps = JSX.IntrinsicElements['textarea'];

export default function MinimizingTextArea({ className, ...props }: TextAreaProps) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const [minimized, setMinimized] = useState(false);
  const [activeTransition, setActiveTransition] = useState(false);

  function setMinimizedAndTransition(minimized: boolean, transition: boolean) {
    setActiveTransition(transition);
    setMinimized(minimized);
    if (minimized) {
      setTimeout(() => ref.current?.blur(), 1);
    } else {
    }
  }

  return (
    <textarea
      {...props}
      ref={ref}
      onMouseDown={() => setMinimizedAndTransition(false, false)}
      onMouseUp={() => setMinimizedAndTransition(false, true)}
      onFocus={() => setMinimizedAndTransition(false, true)}
      onPaste={() => setMinimizedAndTransition(true, true)}
      style={minimized ? { height: '100px' } : {}}
      placeholder="Paste your verifiable credential here"
      className={cn(
        'rounded-md bg-gray-200 p-4',
        activeTransition && 'transition-all duration-200',
        minimized && ' text-stone-600',
        className,
      )}
    ></textarea>
  );
}
