import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/card';
import { isStrRecord } from '@/utils/assertTypes';
import { cn } from '@/utils/styling';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { Claim, CredentialSubject } from '../../../inspector/calculatedAttributes/credentialSubject';

type LeafNode = {
  kind: 'leaf';
  node: ReactNode;
};

type NestedNodes = {
  kind: 'nested';
  values: LabeledValues[];
};

type LabeledValues = {
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
    } else if (typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number') {
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
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle className={cn('flex items-center', TitleIcon && 'gap-3')}>
          <span>{TitleIcon && <TitleIcon width={30} height={30} />}</span>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <NestedValues values={values} root />
    </Card>
  );
}
