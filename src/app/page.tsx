'use client';
import InspectionPage from '@/components/vc-inspection/InspectionPage';
import { ArrowRightIcon, InfoIcon } from 'lucide-react';
import kantegaLogo from '@/public/credentials.png';
import Image from 'next/image';

export default function Home() {
  if (typeof window !== 'undefined' && window.location.hash !== '') {
    const token = window.location.hash.split('=')[1].trim();
    return (
      <>
        <Tester />
        <InspectionPage defaultToken={base64urlDecode(token)} />
      </>
    );
  }
  return (
    <>
      <Tester />
      <InspectionPage />
    </>
  );
}

const base64urlDecode = (input: string) => decodeURIComponent(input);

function Tester() {
  return (
    <div className="relative flex w-full flex-col gap-4 overflow-hidden text-white">
      <Image src={kantegaLogo} alt="Kantega Logo" className="absolute -bottom-56 left-14 -z-10" width={500} />
      <div className="flex w-full flex-row-reverse">
        <div className="mr-20 flex w-2/5 flex-col gap-4">
          <h1 className="text-4xl ">Want to learn more about Verifiable Credentials?</h1>
          <p>Check out Kantega.id for more resources on how Verifiable Credentials might help you or your company.</p>
          <a href="">Learn more!</a>
        </div>
      </div>
      <div className="flex w-full justify-between rounded-xl bg-violet-kantega-200 p-6 text-base font-bold text-black">
        <span className="flex gap-2">
          <InfoIcon /> Always be careful sharing tokens. We do not record tokens, all validation and debugging is done
          client side.
        </span>
        <ArrowRightIcon />
      </div>
    </div>
  );
}
