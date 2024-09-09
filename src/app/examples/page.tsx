'use client';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import examples from './examples.json';
import Image from 'next/image';
import w3cLogo from '@/public/w3c.png';

const devMode = process.env.NODE_ENV === 'development';

/**
 * A page for giving examples on how Verifiable Credentials
 * and Presentations might look and what they might contain.
 * Possible to inspect given examples.
 */
export default function Examples() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold leading-tight text-white">Examples</h1>
        <h2 className="m-0 leading-tight text-white">Click any of the links to see the example in VC-inspector.</h2>
      </div>
      <div className="flex flex-wrap justify-start gap-6">
        {examples.map((example) => {
          if (!devMode && !example.functional) return null;
          return (
            <ExampleLink
              key={example.title}
              title={example.title}
              token={example.token}
              functional={example.functional}
            />
          );
        })}
      </div>
    </div>
  );
}

function ExampleLink({ title, token, functional }: { title: string; token: string; functional: boolean }) {
  let pathName = '';
  if (typeof window !== 'undefined') {
    pathName = window.location.pathname.replace('/examples', '/');
    pathName = pathName.replace('/introduction', '/');
  }
  const href = `${pathName}#vc-debugger?token=${token}`;

  return (
    <a
      href={href}
      className={cn(
        buttonVariants({ variant: 'default', size: 'default' }),
        'h-72 w-72 text-wrap rounded-xl text-xl text-foreground',
        devMode
          ? 'bg-background hover:bg-background active:bg-background/50'
          : functional
            ? 'bg-green-600'
            : 'bg-red-600',
      )}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-blue-300">
          <Image src={w3cLogo} alt={title} width={100} height={100} />
        </div>
        {title}
      </div>
    </a>
  );
}
