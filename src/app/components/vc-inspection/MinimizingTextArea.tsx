'use client';

import { cn } from '@/utils/styling';
import { useCallback, useEffect, useRef, useState } from 'react';

type TextAreaProps = JSX.IntrinsicElements['textarea'] & {
  startHeight?: number;
  requestMinimizationTo?: boolean;
  onMinimizationChange?: (a: boolean) => void;
};

const START_HEGHT = 300;
const MINIMIZED_HEIGHT = 50;

/**
 * A text area that minimizes after text is pasted.
 * When minimized, its height is reduced to a constant
 * `MINIMIZED_HEIGHT`. When in focus again, it expands
 * to the previously defined height before minimization.
 */
export default function MinimizingTextArea({
  onMinimizationChange,
  requestMinimizationTo,
  startHeight = START_HEGHT,
  className,
  ...props
}: TextAreaProps) {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => ref.current?.focus(), []);

  const [minimized, setMinimized] = useState(false);
  const [activeTransition, setActiveTransition] = useState(true);
  const [lastHeight, setLastHeight] = useState(startHeight);
  const [heightNotMinimized, setHeightNotMinimized] = useState(startHeight);

  const handleMinimizationChanges = useCallback(
    (expand: boolean, requestedMinimize: boolean) => {
      if (requestedMinimize) {
        setLastHeight(ref.current?.clientHeight ?? startHeight);
        setTimeout(() => ref.current?.blur(), 1);
      } else if (expand) {
        setHeightNotMinimized(lastHeight);
      }
    },
    [lastHeight, startHeight],
  );

  useEffect(() => {
    if (requestMinimizationTo !== undefined) {
      const expand = minimized && !requestMinimizationTo;
      handleMinimizationChanges(expand, requestMinimizationTo);
      onMinimizationChange?.(requestMinimizationTo);
      setMinimized(requestMinimizationTo);
    }
  }, [requestMinimizationTo, onMinimizationChange, handleMinimizationChanges, minimized]);

  /**
   * Updates minimization state with transition state.
   * This synchronous update is required to not have transitions
   * when resizing the text area. Additionally, we want
   * the text area to go back to its original height when
   * it is activated. Also after a resize and minimization.
   * The minimal timout are used to force the minimization and blurring
   * happen after the transition state update and paste have
   * been finished respectively.
   */
  function setMinimizedAndTransition(minimize: boolean, transition: boolean) {
    const expand = minimized && !minimize;
    setActiveTransition(transition);
    setTimeout(() => {
      if (minimize !== undefined) {
        onMinimizationChange?.(minimize);
        setMinimized(minimize);
      }
    }, 1);
    handleMinimizationChanges(expand, minimize);
  }

  return (
    <textarea
      {...props}
      aria-label="Verifiable Credential Text Area"
      ref={ref}
      spellCheck={false}
      onMouseDown={() => setMinimizedAndTransition(false, false)}
      onMouseUp={() => setMinimizedAndTransition(false, true)}
      onFocus={() => setMinimizedAndTransition(false, true)}
      onPaste={() => setMinimizedAndTransition(true, true)}
      aria-hidden={minimized}
      style={{ height: minimized ? MINIMIZED_HEIGHT + 'px' : heightNotMinimized + 'px' }}
      placeholder="Paste your verifiable credential here"
      className={cn(
        'rounded-md bg-light-gray p-4 placeholder-readable-gray',
        activeTransition && 'transition-all duration-200',
        minimized && 'overflow-hidden text-readable-gray',
        className,
      )}
    />
  );
}
