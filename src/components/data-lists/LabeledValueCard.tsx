import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { isPrimitive, isStrRecord } from '@inspector/assertTypes';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { Button } from '../ui/button';

/**
 * Component to display a json/Record like structure.
 * Nested values will also be displayed with an indent.
 * Helper functions have been defined to facilitate
 * adding labeled values.
 */
export default function LabeledValueCard({
  titleIcon: TitleIcon,
  title,
  values,
  className,
  ...props
}: LabeledValueCardProps) {
  return (
    <>
      <p className="my-1 flex items-center gap-2 text-sm text-green-500">
        <span className="h-3 w-3 rounded-full border-2 border-green-500" />
        {title}
      </p>
      <Card className={className} {...props}>
        <CardHeader className="h-fit border-b-2 p-2">
          <CardTitle
            className={cn('m-0 flex items-center justify-between p-0 text-base leading-none', TitleIcon && 'gap-3')}
          >
            <span className="flex gap-2">
              {TitleIcon && <TitleIcon size="1em" />}
              {title}
            </span>
            <span>
              <Button variant="link">Clear</Button>
              <Button variant="link">Copy</Button>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="border-l-8 border-green-200 bg-light-purple">
          <NestedValues values={values} root />
        </CardContent>
      </Card>
    </>
  );
}

type LeafNode = {
  kind: 'leaf';
  node: ReactNode;
};

type NestedNodes = {
  kind: 'nested';
  values: LabeledValues[];
};

export type LabeledValues = {
  label: string;
  value: LeafNode | NestedNodes;
};

type LabeledValueCardProps = Omit<JSX.IntrinsicElements['div'], 'ref'> & {
  titleIcon?: LucideIcon;
  title: string;
  values: LabeledValues[];
};

export function labeledValue(label: string, value: LeafNode | NestedNodes): LabeledValues {
  return { label, value };
}

export function node(value: ReactNode): LeafNode {
  return { kind: 'leaf', node: value };
}

export function nested(values: LabeledValues[]): NestedNodes {
  return { kind: 'nested', values: values };
}

export function fromJSON(json: Record<string, unknown> | undefined): LabeledValues[] {
  if (!json) {
    return [];
  }

  const entries = Object.entries(json);
  let values: LabeledValues[] = [];

  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];

    if (Array.isArray(value)) {
      values.push({ label: key, value: node(value.join(', ')) });
    } else if (isStrRecord(value)) {
      values.push({ label: key, value: nested(fromJSON(value)) });
    } else if (isPrimitive(value)) {
      values.push({ label: key, value: node(value) });
    }
  }
  return values;
}

/**
 * Recursive labels and values that indents new labeled values
 */
function NestedValues({ values, root }: { values: LabeledValues[]; root?: boolean }) {
  return (
    <>
      {values.map(({ label: l, value: v }) => (
        <CardContent className="py-1" key={l}>
          <p className="text-lg text-readable-gray">{l}</p>
          {v.kind === 'leaf' && (
            <p
              className={cn(
                'relative break-words text-lg font-semibold',
                !root &&
                  "after:absolute after:-left-6 after:top-0 after:h-1/6 after:w-4 after:border-b-2 after:bg-transparent after:content-['']",
              )}
            >
              {v.node}
            </p>
          )}
          {v.kind === 'nested' && (
            <div className="ml-2 border-l-2 border-light-gray">
              <NestedValues values={v.values} />
            </div>
          )}
        </CardContent>
      ))}
    </>
  );
}
