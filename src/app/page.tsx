'use client';
import InspectionPage from '@/components/vc-inspection/InspectionPage';
import { ArrowRightIcon, InfoIcon, Shield, ShieldCheck } from 'lucide-react';
import kantegaLogo from '@/public/credentials.png';
import Image from 'next/image';

export default function Home() {
  if (typeof window !== 'undefined' && window.location.hash !== '') {
    const token = window.location.hash.split('=')[1].trim();
    return (
      <>
        <UpperPagePart />
        <InspectionPage defaultToken={base64urlDecode(token)} />
      </>
    );
  }
  return (
    <>
      <UpperPagePart />
      <InspectionPage />
      <BottomPagePart />
    </>
  );
}

const base64urlDecode = (input: string) => decodeURIComponent(input);

function UpperPagePart() {
  return (
    <div className="relative flex w-full flex-col gap-4 text-white">
      <Image src={kantegaLogo} alt="Kantega Logo" className="absolute -bottom-56 left-14 -z-10" width={500} />
      <div className="flex w-full flex-row-reverse">
        <div className="mr-20 flex w-2/5 flex-col gap-4">
          <h1 className="text-4xl font-semibold">Want to learn more about Verifiable Credentials?</h1>
          <p className=" font-normal">
            Check out Kantega.id for more resources on how Verifiable Credentials might help you or your company.
          </p>
          <a href="" className="underline decoration-purple-kantega-200 decoration-2 underline-offset-8">
            Learn more <span>→</span>
          </a>
        </div>
      </div>
      <div className="flex w-full justify-between rounded-xl bg-purple-kantega-500 p-6 text-base font-bold text-white">
        <span className="flex gap-2">
          <ShieldCheck className="text-violet-kantega-500" /> Always be careful sharing tokens. We do not record tokens,
          all validation and debugging is done client side.
        </span>
        <ArrowRightIcon className="text-purple-600" />
      </div>
    </div>
  );
}

function BottomPagePart() {
  return (
    <div className="relative mt-20 flex h-96 w-full flex-col items-center justify-center  gap-4 rounded-xl bg-gradient-to-b from-purple-kantega-600 to-purple-kantega-700 text-white">
      <Image src={kantegaLogo} alt="Kantega Logo" className="absolute -bottom-32 left-14 z-10" width={600} />
      <div className="flex w-full flex-row-reverse">
        <div className="mr-20 flex w-2/5 flex-col gap-4">
          <h1 className="text-4xl ">Want to learn more about Verifiable Credentials?</h1>
          <p>Check out Kantega.id for more resources on how Verifiable Credentials might help you or your company.</p>
          <a href="" className="underline decoration-purple-kantega-200 decoration-2 underline-offset-8">
            Learn more <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
