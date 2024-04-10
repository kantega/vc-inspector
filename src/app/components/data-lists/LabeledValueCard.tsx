import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/card';
import { cn } from '@/utils/styling';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

type LabeledValues = {
  label: string;
  value: ReactNode;
};

type LabeledValueCardProps = Omit<JSX.IntrinsicElements['div'], 'ref'> & {
  icon?: LucideIcon;
  title: string;
  values: LabeledValues[];
};

export default function LabeledValueCard({ icon: Icon, title, values, className, ...props }: LabeledValueCardProps) {
  return (
    <Card className={cn('', className)} {...props}>
      <CardHeader>
        <CardTitle>
          <span>{Icon && <Icon width={30} height={30} />}</span>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      {values.map(({ label: l, value: v }) => (
        <CardContent key={l}>
          <p className="text-readable-gray">{l}</p>
          <p className="font-semibold">{v}</p>
        </CardContent>
      ))}
    </Card>
  );
}
