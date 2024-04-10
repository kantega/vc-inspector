import type { Meta, StoryObj } from '@storybook/react';
import MinimizingTextArea from '@/components/vc-inspection/MinimizingTextArea';
import { useState } from 'react';

const meta = {
  title: 'VC Inspection/MinimizingTextArea',
  component: MinimizingTextArea,
  tags: ['autodocs'],
} satisfies Meta<typeof MinimizingTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    startHeight: 200,
    className: 'w-full',
  },
};

export const DefaultStartHeight: Story = {};

export const HeightFromClassNames: Story = {
  args: {
    className: 'h-20 w-full',
  },
};

/**
 * Shows a minimization button only when not minimized
 * and after input has been changed.
 */
export const WithExternalMinButton = () => {
  const [state, setState] = useState<'active-button' | 'min' | 'active'>('active');
  return (
    <div className="flex flex-col">
      <MinimizingTextArea
        onChange={() => setState('active-button')}
        onMinimizationChange={(m) => setState(m ? 'min' : state === 'active' ? 'active' : 'active-button')}
        requestMinimizationTo={state === 'min'}
      />
      <button
        className={`m-2 min-w-min self-center rounded-l border-2 bg-blue-100 p-2 ${state != 'active-button' && 'hidden'}`}
        onClick={() => setState('min')}
      >
        Click to minimize!
      </button>
    </div>
  );
};
