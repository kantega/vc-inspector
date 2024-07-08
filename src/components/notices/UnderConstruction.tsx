import { cn } from '@/utils/styling';

type UnderConstructionProps = JSX.IntrinsicElements['div'];

/**
 * Under construction component to display
 * things not yet finished.
 */
export default function UnderConstruction({ className, ...props }: UnderConstructionProps) {
  return (
    <div className={cn('flex flex-col items-center', className)} {...props}>
      <div className="flex items-center">
        <span className="text-4xl">🚧</span>
      </div>
      <span className="text-xl">Under construction</span>
    </div>
  );
}
