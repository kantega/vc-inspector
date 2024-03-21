'use client';

import { cn } from '@/utils/styling';
import { useRef, useState } from 'react';

type TextAreaProps = JSX.IntrinsicElements['textarea'] & {
  startHeight?: number;
};

const START_HEGHT = 300;
const MINIMIZED_HEIGHT = 100;

/**
 * A text area that minimizes after text is pasted.
 * When minimized, its height is reduced to a constant
 * `MINIMIZED_HEIGHT`. When in focus again, it expands
 * to the previously defined height before minimization.
 */
export default function MinimizingTextArea({ startHeight = START_HEGHT, className, ...props }: TextAreaProps) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const [minimized, setMinimized] = useState(false);
  const [activeTransition, setActiveTransition] = useState(false);
  const [lastHeight, setLastHeight] = useState(startHeight);
  const [heightNotMinimized, setHeightNotMinimized] = useState(startHeight);

  /**
   * Updates minimization state with transition state.
   * This synchronous update is required to not have transitions
   * when resizing the text area. Additionally, we want
   * the text area to go back to its original height when
   * it is activated. Also after a resize and minimization.
   * The minimal timouts are used to force the minimization and blurring
   * happen after the transition state update and paste have
   * been finished respectively.
   */
  function setMinimizedAndTransition(minimize: boolean, transition: boolean) {
    const expand = minimized && !minimize;
    setActiveTransition(transition);
    setTimeout(() => {
      setMinimized(minimize);
    }, 1);
    if (minimize) {
      setLastHeight(ref.current?.clientHeight ?? startHeight);
      setTimeout(() => ref.current?.blur(), 1);
    } else if (expand) {
      setHeightNotMinimized(lastHeight);
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
      style={{ height: minimized ? MINIMIZED_HEIGHT + 'px' : heightNotMinimized + 'px' }}
      placeholder="Paste your verifiable credential here"
      className={cn(
        'rounded-md bg-gray-200 p-4',
        activeTransition && 'transition-all duration-200',
        minimized && ' text-stone-600',
        className,
      )}
    />
  );
}
