import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Copy } from 'lucide-react';
import { buttonVariants } from '../ui/button';

export default function CopyButton({ onClick }: { onClick: () => void }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={cn(
            buttonVariants({ variant: 'link' }),
            'group absolute right-4 top-4 rounded-xl p-2 transition-opacity duration-200 hover:bg-violet-700/50',
          )}
          onClick={onClick}
        >
          <Copy className=" text-purple-kantega-200 opacity-80 group-hover:text-background group-hover:opacity-100" />
        </TooltipTrigger>
        <TooltipContent className="rounded-lg">Copy JSON to clipboard</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
