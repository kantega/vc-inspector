'use client';
import InspectionPage from '@/components/vc-inspection/InspectionPage';
import { ShieldCheck } from 'lucide-react';
import kantegaLogo from '@/public/credentials.png';
import Image from 'next/image';

export default function Home() {
  if (typeof window !== 'undefined' && window.location.hash !== '') {
    const token = getToken();

    return (
      <>
        <UpperPagePart />
        <InspectionPage defaultToken={base64urlDecode(token)} />
        <BottomPagePart />
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
      <div className="mb-10 flex w-full flex-row-reverse">
        <div className="mr-20 flex w-full flex-col gap-4 lg:w-2/5">
          <InfoHeader />
          <InfoParagraph />
          <LearnMoreLink />
        </div>
      </div>
      <div className="flex w-full items-center justify-between rounded-xl bg-purple-kantega-500 p-6 text-base font-bold text-white">
        <span className="flex items-center gap-2">
          <ShieldCheck className="h-20 w-20 p-1 text-violet-kantega-500 md:h-10 md:w-10" /> Always be careful sharing
          tokens. We do not record tokens, all validation and debugging is done client side.
        </span>
      </div>
    </div>
  );
}

function BottomPagePart() {
  return (
    <div className="relative mt-20 flex h-96 w-full flex-col items-center justify-center  gap-4 rounded-xl bg-gradient-to-b from-purple-kantega-600 to-purple-kantega-700 text-white">
      <Image src={kantegaLogo} alt="Kantega Logo" className="absolute -bottom-32 left-14 z-10" width={600} />
      <div className="z-20 flex w-full flex-row-reverse">
        <div className="mr-20 flex w-full flex-col gap-4 p-4 sm:w-2/5">
          <InfoHeader />
          <InfoParagraph />
          <LearnMoreLink />
        </div>
      </div>
    </div>
  );
}

function getToken() {
  return decodeURIComponent(
    window.location.hash.split('=').reduce((acc, curr, index) => (index === 0 ? acc : acc + curr), ''),
  );
}

function LearnMoreLink() {
  return (
    <a
      href="https://www.kantega.id/"
      className="underline decoration-purple-kantega-200 decoration-2 underline-offset-8"
    >
      Learn more <span>→</span>
    </a>
  );
}

function InfoParagraph() {
  return (
    <p className=" font-normal">
      Check out Kantega.id for more resources on what verifiable credentials are and how to start using them today.
    </p>
  );
}

function InfoHeader() {
  return <h1 className="text-4xl ">Decode and debug your Verifiable Credentials</h1>;
}
