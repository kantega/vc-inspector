import Image from 'next/image';
import { Button } from '../shadcn/button';
import GitHubCat from '@/public/github-mark.svg';
import Link from 'next/link';
import { cn } from '@/utils/styling';

type FeedbackBoxProps = JSX.IntrinsicElements['div'] & {};

const GITHUB_LINK = 'https://github.com/thomsen85/vc-inspector';

/**
 * A box to remind visitors that they can visit they github
 * repository to either contribute or report new features or bugs.
 */
export default function FeedbackBox({ className, ...props }: FeedbackBoxProps) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-8 rounded-xl bg-dark-purple p-20', className)}
      {...props}
    >
      <h2 className="text-4xl text-white">
        Want to provide <span className="font-semibold">feedback</span> or{' '}
        <span className="font-semibold">contribute</span>?
      </h2>
      <Button variant="secondary" asChild>
        <Link href={GITHUB_LINK} className="items-center gap-3">
          <Image src={GitHubCat} alt="GitHub invertocat" className="h-full w-full" width={40} height={40} />
          <p className="text-xl">See repository</p>
        </Link>
      </Button>
    </div>
  );
}
