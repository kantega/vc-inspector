import FeedbackBox from '@/components/notices/FeedbackBox';
import InspectionPage from '@/components/vc-inspection/InspectionPage';

export default async function Home({ params }: { params: { id: string } }) {
  return (
    <>
      <InspectionPage defaultToken={base64urlDecode(params.id)} />
      <FeedbackBox />
    </>
  );
}

function base64urlDecode(input: string): string {
  const uridecoded = decodeURIComponent(input);

  return uridecoded;
}
