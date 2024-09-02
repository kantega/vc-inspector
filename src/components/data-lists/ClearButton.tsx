import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { XIcon } from 'lucide-react';
import { buttonVariants } from '../ui/button';
import { motion } from 'framer-motion';

export default function ClearButton({ onClick }: { onClick: () => void }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={cn(buttonVariants({ variant: 'link' }), 'group absolute right-16 top-4')}
          onClick={onClick}
        >
          <motion.div
            className="rounded-xl p-2"
            whileHover={{ background: 'rgb(109 40 217 / 0.5)', color: 'white' }}
            transition={{ duration: 0.3 }}
          >
            <XIcon className=" text-purple-kantega-200 opacity-80 group-hover:text-background group-hover:opacity-100" />
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="rounded-lg">Clear textarea</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
