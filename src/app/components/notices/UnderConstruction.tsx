import { cn } from '@/utils/styling';
import { HardHat, Wrench } from 'lucide-react';

type UnderConstructionProps = JSX.IntrinsicElements['div'] & {};

/**
 * Under construction component to display
 * things not yet finished.
 */
export default function UnderConstruction({ className, ...props }: UnderConstructionProps) {
  return (
    <div className={cn('flex flex-col items-center', className)} {...props}>
      <div className="flex items-end text-dark-purple">
        <HardHat width={130} height={130} />
        <Wrench width={100} height={100} />
      </div>
      <h1 className="text-4xl font-bold">Under construction</h1>
    </div>
  );
}
