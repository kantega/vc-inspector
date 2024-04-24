import Image from 'next/image';
import { Button } from '../shadcn/button';
import GitHubCat from '@/public/github-mark-white.svg';
import Link from 'next/link';
import { cn } from '@/utils/styling';
import { GITHUB_LINK } from '@/utils/links';

type FeedbackBoxProps = JSX.IntrinsicElements['div'] & {};

/**
 * A box to remind visitors that they can visit they github
 * repository to either contribute or report new features or bugs.
 */
export default function FeedbackBox({ className, ...props }: FeedbackBoxProps) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-8 rounded-xl p-10  text-center', className)}
      {...props}
    >
      <h2 className="text-2xl ">
        Want to provide <span className="font-semibold">feedback</span> or{' '}
        <span className="font-semibold">contribute</span>?
      </h2>
      <Button variant="default" asChild>
        <Link href={GITHUB_LINK} className="items-center gap-3">
          <Image src={GitHubCat} alt="GitHub invertocat" className="h-full w-auto" width={40} height={40} />
          <p className="text-lg">See repository</p>
        </Link>
      </Button>
    </div>
  );
}
