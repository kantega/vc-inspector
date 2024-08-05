import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import examples from './examples.json';

/**
 * A page for giving examples on how Verifiable Credentials
 * and Presentations might look and what they might contain.
 * Possible to inspect given examples.
 */
export default function Examples() {
  return (
    <div className="flex w-full flex-col items-center gap-8">
      <h2>Click green links to see the example in VC-inspector. The red ones</h2>
      {examples.map((example) => (
        <ExampleLink key={example.title} title={example.title} token={example.token} functional={example.functional} />
      ))}
    </div>
  );
}

function ExampleLink({ title, token, functional }: { title: string; token: string; functional: boolean }) {
  return (
    <Link
      href={`/token/${token}`}
      className={cn(
        buttonVariants({ variant: 'default', size: 'default' }),
        'h-fit w-96 text-wrap text-xl',
        functional ? 'bg-green-600' : 'bg-red-600',
      )}
    >
      {title}
    </Link>
  );
}
