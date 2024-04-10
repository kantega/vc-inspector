import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/card';
import { cn } from '@/utils/styling';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

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

export function node(value: ReactNode): LeafNode {
  return { kind: 'leaf', node: value };
}

export function nested(values: LabeledValues[]): NestedNodes {
  return { kind: 'nested', values: values };
}

/**
 * Recursive labels and values that indents new labeled values
 */
function NestedValues({ values }: { values: LabeledValues[] }) {
  return (
    <>
      {values.map(({ label: l, value: v }) => (
        <CardContent className="py-1" key={l}>
          <p className="text-2xl text-readable-gray">{l}</p>
          {v.kind === 'leaf' && <p className="relative text-2xl font-semibold">{v.node}</p>}
          {v.kind === 'nested' && (
            <div className="border-l-2 border-light-gray">
              <NestedValues values={v.values} />
            </div>
          )}
        </CardContent>
      ))}
    </>
  );
}

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
        <CardTitle className="flex items-center gap-3">
          <span>{TitleIcon && <TitleIcon width={30} height={30} />}</span>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <NestedValues values={values} />
    </Card>
  );
}
