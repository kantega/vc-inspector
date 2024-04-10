import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/card';
import { cn } from '@/utils/styling';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

type LabeledValues = {
  label: string;
  value: ReactNode;
};

type LabeledValueCardProps = Omit<JSX.IntrinsicElements['div'], 'ref'> & {
  titleIcon?: LucideIcon;
  title: string;
  values: LabeledValues[];
};

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
      {values.map(({ label: l, value: v }) => (
        <CardContent key={l}>
          <p className="text-2xl text-readable-gray">{l}</p>
          <p className="text-2xl font-semibold">{v}</p>
        </CardContent>
      ))}
    </Card>
  );
}
