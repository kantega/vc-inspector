import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { XIcon } from 'lucide-react';
import { buttonVariants } from '../ui/button';

export default function ClearButton({ onClick }: { onClick: () => void }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={cn(
            buttonVariants({ variant: 'link' }),
            'group absolute right-16 top-4 rounded-xl p-2 transition-opacity duration-200 hover:bg-violet-700/50',
          )}
          onClick={onClick}
        >
          <XIcon className=" text-purple-kantega-200 opacity-80 group-hover:text-background group-hover:opacity-100" />
        </TooltipTrigger>
        <TooltipContent className="rounded-lg">Clear textarea</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
