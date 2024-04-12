import AccordionSection from '@/components/notices/AccordionSection';
import { Accordion } from '@/components/shadcn/accordion';
import { AccordionSingleProps } from '@radix-ui/react-accordion';
import { Meta, StoryObj } from '@storybook/react';
import { CircleUser } from 'lucide-react';
import { ComponentProps } from 'react';

type WrapperProps = ComponentProps<typeof AccordionSection> & {
  parentAccordionProps?: Omit<AccordionSingleProps, 'type'>;
};

function AccordionWrapper({ parentAccordionProps, ...props }: WrapperProps) {
  return (
    <Accordion type="single" {...parentAccordionProps} collapsible>
      <AccordionSection {...props} />
    </Accordion>
  );
}

const meta = {
  title: 'Notices/AccordionSection',
  component: AccordionWrapper,
  tags: ['autodocs'],
} satisfies Meta<typeof AccordionWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    parentAccordionProps: {
      collapsible: true,
      defaultValue: 'acc',
    },
    title: 'Title',
    value: 'acc',
    children: <div>Children components</div>,
  },
};

export const WithIcon: Story = {
  args: {
    value: 'acc',
    title: 'Title with icon',
    className: 'bg-blue-100',
    titleIcon: CircleUser,
  },
};

export const SmallerTitle: Story = {
  args: {
    value: 'acc',
    className: 'border-2',
    title: <p className="text-lg font-normal">Smaller title</p>,
  },
};
