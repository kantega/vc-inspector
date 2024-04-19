import { cn } from '@/utils/styling';
import { VariantProps, cva } from 'class-variance-authority';
import { HardHat, Wrench } from 'lucide-react';

const ConstructionVariants = cva('', {
  variants: {
    size: {
      small: '[&>h2]:text-sm',
      medium: '[&>h2]:text-lg [&>h2]:font-semibold',
      large: '[&>h2]:text-4xl',
    },
  },
  defaultVariants: {
    size: 'large',
  },
});

type Variants = VariantProps<typeof ConstructionVariants>;
type UnderConstructionProps = Variants & JSX.IntrinsicElements['div'] & {};

const sizeToSVG: Record<Exclude<Variants['size'], undefined | null>, number> = {
  small: 30,
  medium: 60,
  large: 100,
};

/**
 * Under construction component to display
 * things not yet finished.
 */
export default function UnderConstruction({ size, className, ...props }: UnderConstructionProps) {
  const svgSize = sizeToSVG[size ?? 'large'];
  return (
    <div className={cn('flex flex-col items-center', ConstructionVariants({ size }), className)} {...props}>
      <div className="flex items-end text-dark-purple">
        <HardHat width={svgSize * 1.3} height={svgSize * 1.3} />
        <Wrench width={svgSize} height={svgSize} />
      </div>
      <h2 className="font-bold">Under construction</h2>
    </div>
  );
}
