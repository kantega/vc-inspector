import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Copy } from 'lucide-react';
import { buttonVariants } from '../ui/button';
import { motion } from 'framer-motion';

export default function CopyButton({ onClick }: { onClick: () => void }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={cn(buttonVariants({ variant: 'link' }), 'group absolute right-4 top-4')}
          onClick={onClick}
        >
          <motion.div
            className="rounded-xl p-2"
            whileHover={{ background: 'rgb(109 40 217 / 0.5)', color: 'white' }}
            transition={{ duration: 0.3 }}
          >
            <Copy className=" text-purple-kantega-200 opacity-80 group-hover:text-background group-hover:opacity-100" />
          </motion.div>
        </TooltipTrigger>

        <TooltipContent className="rounded-lg">Copy JSON to clipboard</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
